<template>
  <div>
    <div class="mineList">
      <div class="buttonGroup" v-show="!blockList.length">
        <div class="rowNum">
          行数：<input
            type="number"
            v-model="rowCount"
            @blur="checkRow"
            :min="5"
            :max="30"
          />
        </div>
        <div class="colNum">
          列数：<input
            type="number"
            v-model="colCount"
            @blur="checkCol"
            :min="5"
            :max="30"
          />
        </div>
        <div class="mineNum">
          地雷数：<input
            type="number"
            v-model="mineCount"
            @blur="checkMine"
            :min="1"
            :max="rowCount * colCount"
          />
        </div>
        <d-button content="开始游戏" @click="initTable"></d-button>
      </div>
      <div class="mineBox">
        <div class="victory" v-show="isWin">
          <div class="bigTitle">胜利！</div>
          <div class="smallDesc">您赢了，点击重新进入新一局游戏。</div>
          <d-button content="重新开始" @click="restart"></d-button>
        </div>
        <div class="fail" v-show="isFail">
          <div class="bigTitle">失败</div>
          <div class="smallDesc">您输了，点击重新进入新一局游戏。</div>
          <d-button content="重新开始" @click="restart"></d-button>
        </div>
        <div
          class="mineLine"
          v-for="(item, index) in blockList.slice(1, blockList.length - 1)"
          :key="index"
        >
          <div
            :class="{mineItem:true,isMine:item2.num === -1}"
            v-for="(item2, index2) in item.slice(1, item.length - 1)"
            :key="item2.id"
            @click="openBlock(index + 1, index2 + 1)"
            @contextmenu.prevent
            @mouseup.right="sign(index + 1, index2 + 1)"
          >
            <div
              :class="{
                num: true,
                num1: item2.num === 1,
                num2: item2.num === 2,
                num3: item2.num === 3,
                num4: item2.num === 4,
                num5: item2.num === 5,
                num6: item2.num === 6,
                num7: item2.num === 7,
                num8: item2.num === 8,
              }"
              v-show="item2.num > 0"
            >
              {{ item2.num }}
            </div>
            <div class="bomb" v-show="item2.num === -1">
              <div class="iconfont">&#xece8;</div>
            </div>
            <div class="block" v-show="!item2.isOpen"></div>
            <div class="flag">
              <div class="iconfont" v-show="item2.isFlag">&#xe6c4;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mine-sweeper",
  data() {
    return {
      blockList: [],
      mineList: [],
      mineCount: 10,
      rowCount: 9,
      colCount: 9,
      gameStart: false,
      isFail: false,
    };
  },
  created() {},
  computed: {
    isWin() {
      if (!this.blockList.length) {
        return false;
      }
      let Count = 0;
      for (let i = 1; i <= this.rowCount; i++) {
        for (let j = 1; j <= this.colCount; j++) {
          if (this.blockList[i][j].isOpen) {
            Count++;
          }
        }
      }
      return this.rowCount * this.colCount - this.mineCount === Count;
    },
  },
  methods: {
    restart() {
      this.blockList = [];
      this.mineList = [];
      this.isFail = false;
      this.gameStart = false;
    },
    checkRow() {
      if (this.rowCount < 5 || this.rowCount > 30) {
        this.rowCount = 9;
        ElNotification({
          title: "error",
          message: "行列数请设置在5-30以内！",
          type: "error",
        });
      }
    },
    checkCol() {
      if (this.colCount < 5 || this.colCount > 30) {
        this.colCount = 9;
        ElNotification({
          title: "error",
          message: "行列数请设置在5-30以内！",
          type: "error",
        });
      }
    },
    checkMine() {
      if (
        this.colCount < 1 ||
        this.mineCount > this.rowCount * this.colCount - 1
      ) {
        this.mineCount = 10;
        ElNotification({
          title: "error",
          message: `地雷数请设置在1-${this.rowCount * this.colCount - 1}内！`,
          type: "error",
        });
      }
    },
    initTable() {
      // 初始化生成扫雷格子（生成多两行两列，方便后期计算周围雷数）

      for (let i = 0; i <= this.rowCount + 1; i++) {
        this.blockList.push([]);
        for (let j = 0; j <= this.colCount + 1; j++) {
          this.blockList[i].push({
            id: i + "" + j,
            num:
              i === 0 ||
              j === 0 ||
              i === this.rowCount + 1 ||
              j === this.colCount + 1
                ? 1
                : 0,
            isOpen: false,
            isFlag: false,
          });
        }
      }
    },
    openBlock(row, col) {
      if (!this.gameStart) {
        this.initMine(row, col);
        this.gameStart = true;
      }
      this.blockList[row][col].isOpen = true;
      this.blockList[row][col].isFlag = false;
      if (this.blockList[row][col].num === -1) {
        return (this.isFail = true);
      }
      if (this.blockList[row][col].num === 0) {
        this.openBlank(row, col);
      }
    },
    initMine(row, col) {
      for (let i = 0; i < this.mineCount; i++) {
        // Math.round(Math.random()*最大值和最小值的差+最小值);
        //取随机数来布雷
        let newRow = Math.round(Math.random() * (this.rowCount - 1) + 1);
        let newCol = Math.round(Math.random() * (this.colCount - 1) + 1);
        //点击的第一个坐标不能是雷
        if (newRow === row && newCol === col) {
          i--;
          continue;
        }
        //如果已经有雷的坐标重新获取随机数
        if (
          this.mineList.some((item) => {
            return newRow === item[0] && newCol === item[1];
          })
        ) {
          i--;
          continue;
        }
        this.mineList.push([newRow, newCol]);
        this.blockList[newRow][newCol].num = -1;
      }
      this.initCount();
    },
    initCount() {
      this.mineList.forEach((item) => {
        let row = item[0];
        let col = item[1];
        this.blockList[row - 1][col - 1].num !== -1
          ? (this.blockList[row - 1][col - 1].num += 1)
          : "";
        this.blockList[row - 1][col].num !== -1
          ? (this.blockList[row - 1][col].num += 1)
          : "";
        this.blockList[row - 1][col + 1].num !== -1
          ? (this.blockList[row - 1][col + 1].num += 1)
          : "";
        this.blockList[row][col - 1].num !== -1
          ? (this.blockList[row][col - 1].num += 1)
          : "";
        this.blockList[row][col + 1].num !== -1
          ? (this.blockList[row][col + 1].num += 1)
          : "";
        this.blockList[row + 1][col - 1].num !== -1
          ? (this.blockList[row + 1][col - 1].num += 1)
          : "";
        this.blockList[row + 1][col].num !== -1
          ? (this.blockList[row + 1][col].num += 1)
          : "";
        this.blockList[row + 1][col + 1].num !== -1
          ? (this.blockList[row + 1][col + 1].num += 1)
          : "";
      });
    },
    openBlank(row, col) {
      if (!this.blockList[row - 1][col - 1].isOpen) {
        this.blockList[row - 1][col - 1].isOpen = true;
        this.blockList[row - 1][col - 1].isFlag = false;
        if (this.blockList[row - 1][col - 1].num === 0) {
          this.openBlank(row - 1, col - 1);
        }
      }
      if (!this.blockList[row - 1][col].isOpen) {
        this.blockList[row - 1][col].isOpen = true;
        this.blockList[row - 1][col].isFlag = false;
        if (this.blockList[row - 1][col].num === 0) {
          this.openBlank(row - 1, col);
        }
      }
      if (!this.blockList[row - 1][col + 1].isOpen) {
        this.blockList[row - 1][col + 1].isOpen = true;
        this.blockList[row - 1][col + 1].isFlag = false;
        if (this.blockList[row - 1][col + 1].num === 0) {
          this.openBlank(row - 1, col + 1);
        }
      }
      if (!this.blockList[row][col - 1].isOpen) {
        this.blockList[row][col - 1].isOpen = true;
        this.blockList[row][col - 1].isFlag = false;
        if (this.blockList[row][col - 1].num === 0) {
          this.openBlank(row, col - 1);
        }
      }
      if (!this.blockList[row][col + 1].isOpen) {
        this.blockList[row][col + 1].isOpen = true;
        this.blockList[row][col + 1].isFlag = false;
        if (this.blockList[row][col + 1].num === 0) {
          this.openBlank(row, col + 1);
        }
      }
      if (!this.blockList[row + 1][col - 1].isOpen) {
        this.blockList[row + 1][col - 1].isOpen = true;
        this.blockList[row + 1][col - 1].isFlag = false;
        if (this.blockList[row + 1][col - 1].num === 0) {
          this.openBlank(row + 1, col - 1);
        }
      }
      if (!this.blockList[row + 1][col].isOpen) {
        this.blockList[row + 1][col].isOpen = true;
        this.blockList[row + 1][col].isFlag = false;
        if (this.blockList[row + 1][col].num === 0) {
          this.openBlank(row + 1, col);
        }
      }
      if (!this.blockList[row + 1][col + 1].isOpen) {
        this.blockList[row + 1][col + 1].isOpen = true;
        this.blockList[row + 1][col + 1].isFlag = false;
        if (this.blockList[row + 1][col + 1].num === 0) {
          this.openBlank(row + 1, col + 1);
        }
      }
    },
    sign(row, col) {
      if (!this.blockList[row][col].isOpen) {
        this.blockList[row][col].isFlag = !this.blockList[row][col].isFlag;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.mineList {
  min-height: 150px;
  min-width: 150px;
  width: fit-content;
  margin: 0 auto;
  position: relative;
  .buttonGroup {
    .rowNum,
    .colNum,
    .mineNum {
      margin-bottom: 10px;
      width: 180px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      input {
        width: 120px;
        height: 40px;
        border: 2px solid #0d0d0d;
        border-radius: 10px;
        padding: 0 10px;
        font-size: 16px;
      }
    }
    .d-button {
      border-radius: 10px;
      width: 100%;
    }
  }
  .mineBox {
    position: relative;
    .victory,
    .fail {
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
  }
  .mineLine {
    display: flex;
    .isMine{
      background-color: red!important;
    }
    .mineItem {
      width: 30px;
      height: 30px;
      user-select: none;
      background-color: #e3e3e3;
      border: 1px solid darkgray;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      cursor: default;
      .num {
        font-weight: bold;
      }
      .num1 {
        color: blue;
      }
      .num2 {
        color: green;
      }
      .num3 {
        color: red;
      }
      .num4 {
        color: orange;
      }
      .num5 {
        color: purple;
      }
      .num6 {
        color: pink;
      }
      .num7 {
        color: aquamarine;
      }
      .num8 {
        color: brown;
      }
      .bomb{
        font-size: 14px;
        margin-left: 4px;
      }
      .block {
        background-color: gray;
        width: 30px;
        height: 30px;
        position: absolute;
        left: 0;
        top: 0;
        cursor: pointer;
      }
      .flag {
        position: absolute;
        font-size: 14px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: red;
        cursor: pointer;
      }
    }
  }
}
</style>
