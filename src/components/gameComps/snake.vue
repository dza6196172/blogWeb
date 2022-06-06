<template>
  <div class="snake">
    <div class="table">
      <div class="startGame" v-show="!gameStart">
        <d-button content="开始游戏" @click="startGame"></d-button>
      </div>
      <div class="gameover" v-show="fail">
        <div class="bigTitle">游戏结束</div>
        <div class="smallDesc">您输了，点击重新进入新一局游戏。</div>
        <d-button content="重新开始" @click="restart"></d-button>
      </div>
      <div class="tableRow" v-for="(row, index) in table" :key="index">
        <div
          class="tableCol"
          v-for="col in row"
          :key="col.x + '' + col.y"
          :class="{
            isSnake: isSnake(col.x, col.y),
            isHead:
              col.x === snakeList[snakeList.length - 1].x &&
              col.y === snakeList[snakeList.length - 1].y,
            isApple: col.x === apple[0] && col.y === apple[1],
          }"
          :style="{'border-top':index === 0?'1px solid #0d0d0d':'none'}"
        >
          <!-- {{col.x+''+col.y}} -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "snake",
  data() {
    return {
      table: [],
      row: 30,
      col: 30,
      snakeList: [
        {
          x: 10,
          y: 10,
        },
        {
          x: 10,
          y: 11,
        },
        {
          x: 10,
          y: 12,
        },
        {
          x: 10,
          y: 13,
        },
      ],
      direction: "right",
      speed: 300,
      apple: [10, 20],
      timeOut: null,
      isChanging: null,
      fail:false,
      gameStart:false,
    };
  },
  mounted() {
    this.initTable();
    // this.startGame();
    window.addEventListener("keyup", (e) => {
      this.changeDirection(e);
    });
  },
  methods: {
    restart(){
      Object.assign(this.$data, this.$options.data.call(this))
      this.initTable();
    },
    initTable() {
      for (let i = 0; i < this.row; i++) {
        this.table.push([]);
        for (let j = 0; j < this.col; j++) {
          this.table[i].push({
            x: i,
            y: j,
          });
        }
      }
    },
    isSnake(x, y) {
      if (
        this.snakeList.some((item) => {
          return item.x === x && item.y === y;
        })
      ) {
        return true;
      } else {
        return false;
      }
    },
    createApple() {
      // Math.round(Math.random()*最大值和最小值的差+最小值);
      let x = Math.round(Math.random() * (this.row - 1));
      let y = Math.round(Math.random() * (this.col - 1));
      if (
        this.snakeList.some((item) => {
          return item.x === x && item.y === y;
        })
      ) {
        return this.createApple();
      }
      this.apple = [x, y];
    },
    startGame() {
      this.gameStart = true
      this.timeOut = setInterval(() => {
        if (this.direction === "right") {
          this.snakeList.push({
            x: this.snakeList[this.snakeList.length - 1].x,
            y: this.snakeList[this.snakeList.length - 1].y + 1,
          });
        }
        if (this.direction === "left") {
          this.snakeList.push({
            x: this.snakeList[this.snakeList.length - 1].x,
            y: this.snakeList[this.snakeList.length - 1].y - 1,
          });
        }
        if (this.direction === "up") {
          this.snakeList.push({
            x: this.snakeList[this.snakeList.length - 1].x - 1,
            y: this.snakeList[this.snakeList.length - 1].y,
          });
        }
        if (this.direction === "down") {
          this.snakeList.push({
            x: this.snakeList[this.snakeList.length - 1].x + 1,
            y: this.snakeList[this.snakeList.length - 1].y,
          });
        }
        let head = this.snakeList[this.snakeList.length - 1];
        if (
          head.x > this.row ||
          head.y > this.col ||
          head.x < 0 ||
          head.y < 0
        ) {
          clearInterval(this.timeOut);
          return this.gameOver()
        }
        if (
          this.snakeList.some((item, index, array) => {
            return (
              head.x === item.x &&
              head.y === item.y &&
              index !== array.length - 1
            );
          })
        ) {
          clearInterval(this.timeOut);
          return this.gameOver()
        }
        if (head.x === this.apple[0] && head.y === this.apple[1]) {
          this.apple = [];
          this.createApple();
          if (this.snakeList.length % 10 === 0) {
            this.speed = this.speed - this.speed / 4;
            clearInterval(this.timeOut);
            this.startGame();
          }
        } else {
          this.snakeList.shift();
        }
      }, this.speed);
    },
    gameOver() {
      this.fail = true
    },
    changeDirection(e) {
      if (this.isChanging) {
        return;
      }
      this.isChanging = setTimeout(() => {
        clearTimeout(this.isChanging);
        this.isChanging = null;
      }, this.speed > 150? this.speed / 2:this.speed);
      if (e.code === "ArrowRight") {
        if (this.direction === "left") {
          return;
        }
        this.direction = "right";
      }
      if (e.code === "ArrowUp") {
        if (this.direction === "down") {
          return;
        }
        this.direction = "up";
      }
      if (e.code === "ArrowLeft") {
        if (this.direction === "right") {
          return;
        }
        this.direction = "left";
      }
      if (e.code === "ArrowDown") {
        if (this.direction === "up") {
          return;
        }
        this.direction = "down";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.snake {
  .table {
    margin: 0 auto;
    width: fit-content;
    position: relative;
    .gameover,.startGame {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
      background-color: rgba($color: white, $alpha: 0.6);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .bigTitle {
        font-size: 30px;
        font-weight: bold;
      }
      .smallDesc {
        margin-bottom: 10px;
      }
      .d-button {
        border-radius: 10px;
      }
    }
    .tableRow {
      display: flex;
      .tableCol {
        width: 10px;
        height: 10px;
        border-right: 1px solid #0d0d0d;
        border-bottom: 1px solid #0d0d0d;
        &:first-of-type {
          border-left: 1px solid #0d0d0d;
        }
      }
      .isSnake {
        background-color: rgba($color: gray, $alpha: 0.6);
      }
      .isHead {
        background-color: gray !important;
      }
      .isApple {
        background-color: red;
      }
    }
  }
}
</style>
