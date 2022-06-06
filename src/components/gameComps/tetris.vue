<template>
  <div class="tetris" @click="focusGame">
    <div class="gameOver" v-show="fail">
      <div class="title">游戏结束</div>
      
      <div class="score">您的分数：{{score}}</div>
      <d-button content="重新开始" @click="restart"></d-button>
    </div>
    <input
      type="text"
      ref="tetrisRef"
      @keydown="speedup"
      @keyup="move"
      style="position: absolute; opacity: 0; z-index: -1"
    />
    <div class="table">
      <div class="row" v-for="(row, rowIndex) in tableList" :key="rowIndex">
        <div
          class="col"
          v-for="col in row"
          :key="col.x + '' + col.y"
          :class="{ isFalling: isFalling(col.x, col.y) }"
          :style="{
            'background-color': isFallen(col.x, col.y) ? 'white' : 'lightgray',
          }"
        ></div>
      </div>
    </div>
    <div class="rightBoard">
      <div class="nextBlock">
        下一方块：
        <div class="row" v-for="(row, rowIndex) in 4" :key="rowIndex">
          <div
            class="col"
            v-for="(col, colIndex) in 4"
            :key="colIndex"
            :style="{'background-color':isNext(rowIndex,colIndex)?'gray':'lightgray'}"
          ></div>
        </div>
      </div>
      <div class="score">
        分数：
        <div class="scoreNum">
          {{score}}
        </div>
      </div>
      <div class="buttonGroup">
        <div class="startGame" v-show="!gameStart">
          <d-button content="开始游戏" @click="startGame"></d-button>
        </div>
        <div class="space" @click="move({code:'Space'})">__</div>
        <div class="arrowGroup">
          <div class="left" @mouseup="move({code:'ArrowLeft'})" @mousedown="speedup({code:'ArrowLeft'})">←</div>
          <div class="down" @mouseup="move({code:'ArrowDown'})" @mousedown="speedup({code:'ArrowDown'})">↓</div>
          <div class="right" @mouseup="move({code:'ArrowRight'})" @mousedown="speedup({code:'ArrowRight'})">→</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tetris",
  data() {
    return {
      score:0,
      tableList: [],
      blockList: {
        l: {
          blocks: [
            [
              {
                x: 2,
                y: 0,
              },
              {
                x: 2,
                y: 1,
              },
              {
                x: 2,
                y: 2,
              },
              {
                x: 1,
                y: 2,
              },
            ],
            [
              {
                x: 0,
                y: 1,
              },
              {
                x: 1,
                y: 1,
              },
              {
                x: 2,
                y: 1,
              },
              {
                x: 2,
                y: 2,
              },
            ],
            [
              {
                x: 1,
                y: 3,
              },
              {
                x: 1,
                y: 2,
              },
              {
                x: 1,
                y: 1,
              },
              {
                x: 2,
                y: 1,
              },
            ],
            [
              {
                x: 3,
                y: 2,
              },
              {
                x: 2,
                y: 2,
              },
              {
                x: 1,
                y: 2,
              },
              {
                x: 1,
                y: 1,
              },
            ],
          ],
        },
        i: {
          blocks: [
            [
              {
                x: 0,
                y: 1,
              },
              {
                x: 1,
                y: 1,
              },
              {
                x: 2,
                y: 1,
              },
              {
                x: 3,
                y: 1,
              },
            ],
            [
              {
                x: 1,
                y: 0,
              },
              {
                x: 1,
                y: 1,
              },
              {
                x: 1,
                y: 2,
              },
              {
                x: 1,
                y: 3,
              },
            ],
          ],
        },
        j: {
          blocks: [
            [
              {
                x: 2,
                y: 1,
              },
              {
                x: 2,
                y: 2,
              },
              {
                x: 1,
                y: 2,
              },
              {
                x: 0,
                y: 2,
              },
            ],
            [
              {
                x: 1,
                y: 1,
              },
              {
                x: 2,
                y: 1,
              },
              {
                x: 2,
                y: 2,
              },
              {
                x: 2,
                y: 3,
              },
            ],
            [
              {
                x: 1,
                y: 1,
              },
              {
                x: 2,
                y: 1,
              },
              {
                x: 3,
                y: 1,
              },
              {
                x: 1,
                y: 2,
              },
            ],
            [
              {
                x: 1,
                y: 0,
              },
              {
                x: 1,
                y: 1,
              },
              {
                x: 1,
                y: 2,
              },
              {
                x: 2,
                y: 2,
              },
            ],
          ],
        },
        o: {
          blocks: [
            [
              {
                x: 1,
                y: 1,
              },
              {
                x: 2,
                y: 1,
              },
              {
                x: 1,
                y: 2,
              },
              {
                x: 2,
                y: 2,
              },
            ],
          ],
        },
        s: {
          blocks: [
            [
              {
                x: 2,
                y: 0,
              },
              {
                x: 1,
                y: 1,
              },
              {
                x: 2,
                y: 1,
              },
              {
                x: 1,
                y: 2,
              },
            ],
            [
              {
                x: 0,
                y: 1,
              },
              {
                x: 1,
                y: 1,
              },
              {
                x: 1,
                y: 2,
              },
              {
                x: 2,
                y: 2,
              },
            ],
          ],
        },
        t: {
          blocks: [
            [
              {
                x: 1,
                y: 0,
              },
              {
                x: 0,
                y: 1,
              },
              {
                x: 1,
                y: 1,
              },
              {
                x: 1,
                y: 2,
              },
            ],
            [
              {
                x: 0,
                y: 1,
              },
              {
                x: 1,
                y: 1,
              },
              {
                x: 2,
                y: 1,
              },
              {
                x: 1,
                y: 2,
              },
            ],
            [
              {
                x: 1,
                y: 0,
              },
              {
                x: 1,
                y: 1,
              },
              {
                x: 2,
                y: 1,
              },
              {
                x: 1,
                y: 2,
              },
            ],
            [
              {
                x: 1,
                y: 0,
              },
              {
                x: 0,
                y: 1,
              },
              {
                x: 1,
                y: 1,
              },
              {
                x: 2,
                y: 1,
              },
            ],
          ],
        },
        z: {
          blocks: [
            [
              {
                x: 1,
                y: 0,
              },
              {
                x: 1,
                y: 1,
              },
              {
                x: 2,
                y: 1,
              },
              {
                x: 2,
                y: 2,
              },
            ],
            [
              {
                x: 1,
                y: 1,
              },
              {
                x: 2,
                y: 1,
              },
              {
                x: 0,
                y: 2,
              },
              {
                x: 1,
                y: 2,
              },
            ],
          ],
        },
      },
      currentBlock: {
        x: -3,
        y: 3,
        name: "i",
        currentRotate: 1,
      },
      nextBlock:{
        x: 0,
        y: 0,
        name: "i",
        currentRotate: 1,
      },
      fallenBlock: [],
      timeOut: null,
      speedUpTimeOut: null,
      gameStart:false,
      fail:false
    };
  },
  mounted() {
    this.initTable();
  },
  beforeUnmount() {
    clearInterval(this.timeOut);
    clearInterval(this.speedUpTimeOut);
  },
  methods: {
    restart(){
      Object.assign(this.$data, this.$options.data.call(this))
      this.initTable();
    },
    focusGame() {
      this.$refs.tetrisRef.focus();
    },
    initTable() {
      for (let i = 0; i < 18; i++) {
        this.tableList.push([]);
        for (let j = 0; j < 10; j++) {
          this.tableList[i].push({
            x: i,
            y: j,
          });
        }
      }
    },
    startGame() {
      this.gameStart = true
      this.timeOut = setInterval(() => {
        if (this.checkDownMoveBound()) {
          this.fallDown();
        } else {
          this.currentBlock.x++;
        }
      }, 1000);
    },
    //加速下落
    speedup(e) {
      if(!this.gameStart){
        return
      }
      clearInterval(this.speedUpTimeOut);
      switch (e.code) {
        case "ArrowRight":
          this.speedUpTimeOut = setInterval(() => {
            if (this.checkRightMoveBound()) {
              return;
            } else {
              this.currentBlock.y++;
            }
          }, 50);
          break;
        case "ArrowLeft":
          this.speedUpTimeOut = setInterval(() => {
            if (this.checkLeftMoveBound()) {
              return;
            } else {
              this.currentBlock.y--;
            }
          }, 50);

          break;
        case "ArrowDown":
          this.speedUpTimeOut = setInterval(() => {
            if (this.checkDownMoveBound()) {
              this.fallDown();
            } else {
              this.currentBlock.x++;
            }
          }, 35);
          break;
        default:
          break;
      }
    },
    move(e) {
      switch (e.code) {
        case "ArrowRight":
          clearInterval(this.speedUpTimeOut);
          // if (this.checkRightMoveBound()) {
          //   return;
          // } else {
          //   this.currentBlock.y++;
          // }

          break;
        case "ArrowLeft":
          clearInterval(this.speedUpTimeOut);
          // if (this.checkLeftMoveBound()) {
          //   return;
          // } else {
          //   this.currentBlock.y--;
          // }
          break;
        case "ArrowDown":
          clearInterval(this.speedUpTimeOut);
          break;
        case "Space":
          this.checkRotateBound();
          break;
        default:
          break;
      }
    },
    //检查是否超出边界
    checkRightMoveBound() {
      return (
        this.blockList[this.currentBlock.name].blocks[
          this.currentBlock.currentRotate
        ].some((item) => {
          return this.currentBlock.y + item.y >= 9;
        }) ||
        this.fallenBlock.some((item) => {
          return this.blockList[this.currentBlock.name].blocks[
            this.currentBlock.currentRotate
          ].some((block) => {
            return (
              this.currentBlock.y + block.y + 1 === item.y &&
              this.currentBlock.x + block.x === item.x
            );
          });
        })
      );
    },
    checkLeftMoveBound() {
      return (
        this.blockList[this.currentBlock.name].blocks[
          this.currentBlock.currentRotate
        ].some((item) => {
          return this.currentBlock.y + item.y <= 0;
        }) ||
        this.fallenBlock.some((item) => {
          return this.blockList[this.currentBlock.name].blocks[
            this.currentBlock.currentRotate
          ].some((block) => {
            return (
              this.currentBlock.y + block.y - 1 === item.y &&
              this.currentBlock.x + block.x === item.x
            );
          });
        })
      );
    },
    checkDownMoveBound() {
      return (
        this.fallenBlock.some((item) => {
          return this.blockList[this.currentBlock.name].blocks[
            this.currentBlock.currentRotate
          ].some((block) => {
            return (
              this.currentBlock.x + block.x + 1 === item.x &&
              this.currentBlock.y + block.y === item.y
            );
          });
        }) ||
        this.blockList[this.currentBlock.name].blocks[
          this.currentBlock.currentRotate
        ].some((item) => {
          return this.currentBlock.x + item.x >= 17;
        })
      );
    },
    checkRotateBound() {
      let p = new Promise((resolve, reject) => {
        let newRatateIndex = this.currentBlock.currentRotate;
        if (
          newRatateIndex <
          this.blockList[this.currentBlock.name].blocks.length - 1
        ) {
          newRatateIndex++;
        } else {
          newRatateIndex = 0;
        }
        this.fallenBlock.forEach((item) => {
          this.blockList[this.currentBlock.name].blocks[newRatateIndex].forEach(
            (block) => {
              if (
                this.currentBlock.y + block.y === item.y &&
                this.currentBlock.x + block.x === item.x
              ) {
                reject();
              }
            }
          );
        });
        this.blockList[this.currentBlock.name].blocks[newRatateIndex].forEach(
          (item) => {
            if (this.currentBlock.x + item.x > 17) {
              reject();
            }
          }
        );
        resolve();
      });

      p.then(() => {
        if (
          this.currentBlock.currentRotate <
          this.blockList[this.currentBlock.name].blocks.length - 1
        ) {
          this.currentBlock.currentRotate++;
        } else {
          this.currentBlock.currentRotate = 0;
        }
        this.blockList[this.currentBlock.name].blocks[
          this.currentBlock.currentRotate
        ].forEach((item) => {
          if (this.currentBlock.y + item.y > 9) {
            this.currentBlock.y--;
          }
          if (this.currentBlock.y + item.y < 0) {
            this.currentBlock.y++;
          }
        });
      }).catch((err) => {});
    },
    //下落完成
    fallDown() {
      this.blockList[this.currentBlock.name].blocks[
        this.currentBlock.currentRotate
      ].forEach((item) => {
        this.fallenBlock.push({
          x: this.currentBlock.x + item.x,
          y: this.currentBlock.y + item.y,
        });
      });
      this.clearLine();
      this.createBlock();
    },
    //生成新的方块
    createBlock() {
      // Math.round(Math.random()*最大值和最小值的差+最小值);
      let num = Math.round(Math.random() * 6 + 1);
      let blockName = "l";
      switch (num) {
        case 1:
          blockName = "l";
          break;
        case 2:
          blockName = "i";
          break;
        case 3:
          blockName = "j";
          break;
        case 4:
          blockName = "o";
          break;
        case 5:
          blockName = "s";
          break;
        case 6:
          blockName = "t";
          break;
        case 7:
          blockName = "z";
          break;
        default:
          break;
      }
      this.currentBlock = {
        x: -3,
        y: 3,
        name: this.nextBlock.name,
        currentRotate: 0,
      }
      this.nextBlock = {
        x: 0,
        y: 0,
        name: blockName,
        currentRotate: 0,
      };
      
      clearInterval(this.speedUpTimeOut);
    },
    //正在下落的方块
    isFalling(row, col) {
      return this.blockList[this.currentBlock.name].blocks[
        this.currentBlock.currentRotate
      ].some((item) => {
        return (
          this.currentBlock.x + item.x === row &&
          this.currentBlock.y + item.y === col
        );
      });
    },
    //下个方块
    isNext(row,col){
      return this.blockList[this.nextBlock.name].blocks[
        this.nextBlock.currentRotate
      ].some((item) => {
        return (
          this.nextBlock.x + item.x === row &&
          this.nextBlock.y + item.y === col
        );
      });
    },
    //已下落方块
    isFallen(row, col) {
      return this.fallenBlock.some((item) => {
        return item.x === row && item.y === col;
      });
    },
    //清除行
    clearLine() {
      let data = this.fallenBlock.reduce((calc, item) => {
        let currentIndex = calc.findIndex((item2) => {
          return item2.x === item.x;
        });
        if (currentIndex !== -1) {
          calc[currentIndex].count += 1;
        } else {
          calc.push({
            x: item.x,
            count: 1,
          });
        }
        return calc;
      }, []);
      data = data.sort((a, b) => {
        return a.x - b.x;
      });
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].count === 10) {
          for (let j = 0; j < this.fallenBlock.length; j++) {
            if (this.fallenBlock[j].x === data[i].x) {
              this.fallenBlock.splice(j, 1);
              this.score++
              j--;
            }
          }
          this.fallenBlock.forEach((item, index) => {
            if (item.x < data[i].x) {
              this.fallenBlock[index].x += 1;
            }
          });
          data.forEach((item) => {
            item.x += 1;
          });
        }
      }
      this.gameOver();
      // this.fallenBlock.forEach((item, index) => {
      //   data.reduce((calc,item) =>{
      //     if(item.count === 10){

      //     }
      //   },0)
      //   if (item.x < data[i].x) {
      //     this.fallenBlock[index].x += 1;
      //   }
      // });
    },
    gameOver(){
      if(this.fallenBlock.some(item => {
        return item.x === -1
      })){
        this.fail = true
        clearInterval(this.timeOut)
        clearInterval(this.speedUpTimeOut)
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tetris {
  display: flex;
  margin: 0 auto;
  width: fit-content;
  position: relative;
  .gameOver{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba($color: white, $alpha: 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 1;
    .title{
      font-size: 24px;
      font-weight: bold;
    }
    .score{
      font-size: 16px;
      margin-bottom: 5px;
    }
  }
  .table {
    .row {
      display: flex;
      border-left: 1px solid #0d0d0d;
      &:first-of-type {
        .col {
          border-top: 1px solid #0d0d0d;
        }
      }
      .col {
        width: 25px;
        height: 25px;
        border-right: 1px solid #0d0d0d;
        border-bottom: 1px solid #0d0d0d;
        background-color: lightgray;
      }
      .isFalling {
        background-color: gray !important;
      }
    }
  }
  .rightBoard {
    width: 150px;
    height: 450px;
    border: 1px solid #0d0d0d;
    border-left: none;
    background-color: lightgray;
    display: flex;
    flex-direction: column;
    align-items: center;
    .nextBlock {
      font-size: 13px;
      font-weight: bold;
      @extend .table;
      margin-top: 15px;
    }
    .score{
      width: 100px;
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      align-items: center;
      .scoreNum{
        font-weight: bold;
        font-size: 15px;
      }
    }
    .buttonGroup{
      margin-top: auto;
      margin-bottom: 15px;
      .startGame{
        margin-bottom: 10px;
        .d-button{
          width: 100px;
          height: 30px;
          font-size: 13px;
          padding: 0;
        }
      }
      .space{
        width: 100px;
        height: 30px;
        border: 1px solid #0d0d0d;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        cursor: pointer;
      }
      .arrowGroup{
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        .left,.down,.right{
          width: 30px;
          height: 30px;
          border: 1px solid #0d0d0d;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
