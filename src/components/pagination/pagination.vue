<template>
  <div class="page-tab" v-if="total > 10">
    <div :class="{left:true,forbid:pageNum == 1}" @click="lastPage()"><span class="iconfont">&#xe745;</span></div>
    <div class="middle">
      <div class="pagecate" v-if="pagecount<=9">
        <div :class="{middleitem:true,pageactive:item==pageNum}" v-for="item in pagecount" :key="item" @click="changePage(item)">{{item}}</div>
      </div>
      <div class="pagecate" v-else-if="pagecount>9&&pageNum<=5">
        <div :class="{middleitem:true,pageactive:item==pageNum}" v-for="item in 8" :key="item" @click="changePage(item)">{{item}}</div>
        <div class="middleitem">···</div>
        <div :class="{middleitem:true,pageactive:pagecount==pageNum}" @click="changePage(pagecount)">{{pagecount}}</div>
      </div>
      <div class="pagecate" v-else-if="pagecount>9&&pageNum>5&&pageNum<=pagecount-5">
        <div :class="{middleitem:true,pageactive:pageNum==1}" @click="changePage(1)">1</div>
        <div class="middleitem">···</div>
        <div :class="{middleitem:true,pageactive:item==pageNum}" v-for="item in middleArr" :key="item" @click="changePage(item)">{{item}}</div>
        <div class="middleitem">···</div>
        <div :class="{middleitem:true,pageactive:pagecount==pageNum}" @click="changePage(pagecount)">{{pagecount}}</div>
      </div>
      <div class="pagecate" v-else-if="pagecount>9&&pageNum>pagecount-5">
        <div :class="{middleitem:true,pageactive:1==pageNum}" @click="changePage(1)">1</div>
        <div class="middleitem">···</div>
        <div :class="{middleitem:true,pageactive:item==pageNum}" v-for="item in leftArr" :key="item" @click="changePage(item)">{{item}}</div>
      </div>
    </div>
    <div :class="{right:true,forbid:pageNum == pagecount}" @click="nextPage()"><span class="iconfont">&#xe743;</span></div>
  </div>
</template>

<script>
export default {
  name: "page-tab",
  props:{
    total:{
      type:Number,
      default(){
        return 0
      }
    },
    pageSize:{
      type:Number,
      default(){
        return 10
      }
    },
    pageNum:{
      type:Number,
      default(){
        return 1
      }
    }
  },
  computed:{
    pagecount(){
      return (this.total-this.total%this.pageSize)/this.pageSize+1
    },
    middleArr(){
      let middle = []
      for(let i = -3;i<=3;i++){
        middle.push(this.pageNum+i)
      }
      return middle
    },
    leftArr(){
      let left = []
      for(let i = 6;i>=0;i--){
        left.push(this.pagecount-i)
      }
      return left
    }
  },
  methods: {
    changePage(page){
      this.$emit('changePage',page)
    },
    lastPage(){
      if(this.pageNum == 1){
        return
      }else{
        this.changePage(this.pageNum -1)
      }
    },
    nextPage(){
      if(this.pageNum == this.pagecount){
        return
      }else{
        this.changePage(this.pageNum +1)
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin select {
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.page-tab {
  padding: 0;
  margin: 0 auto;
  width: fit-content;
  display: flex;
  @include select();
}
.left,
.right {
  width: fit-content;
  padding: 0 11px;
  height: 30px;
  border-radius: 3px;
  border: 1px solid #0d0d0d;
  line-height: 28px;
  text-align: center;
  cursor: pointer;
  margin-right: 3px;
  &:hover{
    background-color: #f9f9f9;
  }
}
.forbid{
  color: lightgray;
  pointer-events: none;
  border: 1px solid lightgray;
}
.middle{
  display: flex;
  .pagecate{
    display: flex;
    .middleitem{
      @extend .left;
      font-size: 12px;
    }
    .pageactive{
      background-color: #0d0d0d;
      color: white;
      &:hover{
        background-color: #0d0d0d;
      }
    }
  }
}
</style>