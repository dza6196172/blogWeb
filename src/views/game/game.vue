<template>
  <div class="game">
    <div class="gameList">
      <div class="gameItem" v-for="(item, index) in gameList" :key="item.name">
        <el-collapse accordion v-model="activeName">
          <el-collapse-item :title="item.title" :name="item.name">
            <component :is="item.name"></component>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import mineSweeper from '@/components/gameComps/mineSweeper'
import snake from '@/components/gameComps/snake';
import tetris from '@/components/gameComps/tetris';
export default {
  name: "game",
  data() {
    return {
      activeName:'',
      gameList: [
        {
          title: "扫雷",
          name: "mineSweeper",
        },
        {
          title: "贪吃蛇",
          name: "snake",
        },
        {
          title: "俄罗斯方块",
          name: "tetris",
        },
      ],
    };
  },
  components:{
    mineSweeper,
    snake,
    tetris
  },
  created() {
    if(this.$route.query.name){
      this.activeName = this.$route.query.name
    }
  },
  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
.game {
  min-height: calc(100vh - 200px);
  width: 80%;
  max-width: 1200px;
  min-width: 900px;
  margin: 0 auto;
  padding-top: 30px;
  .gameList {
    .gameItem {
      border-radius: 15px;
      background-color: white;
      border: 3px solid #0d0d0d;
      padding: 10px 20px;
      margin-bottom: 20px;
      :deep .el-collapse{
        border: none;
      }
      :deep .el-collapse-item__header{
        border: none;
        font-size: 20px;
        font-weight: bold;
      }
      :deep .el-collapse-item__wrap{
        border: none;
      }
      .content{
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
}
</style>
