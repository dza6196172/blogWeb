<template>
  <div class="footerComp">
    <div class="footerNav">
      <div class="left"></div>
      <div class="middle">小杜's Blog</div>
      <div class="right">
        <!-- <i class="iconfont icon-caidan"></i> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "footerComp",
};
</script>

<style lang="scss" scoped>
.footerComp{
  height: 100px;
  width: 100%;
  background-color: #202020;
  position: sticky;
  top: 0;
  .footerNav{
    min-width: 900px;
    max-width: 1360px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .middle{
      font-size: 24px;
      font-weight: bold;
      color: white;
    }
    .right{
      i{
        font-size: 32px;
        font-weight: bold;
        color: white;
        cursor: pointer;
      }
    }
  }
}
</style>
