<template>
  <div class="toTop" title="回到顶部">
    <div class="iconfont">&#xe621;</div>
  </div>
</template>

<script>
export default {
  name: "to-top",
};
</script>

<style lang="scss" scoped>
.toTop {
  width: 50px;
  height: 50px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0d0d0d;
  border-radius: 50%;
  cursor: pointer;
  .iconfont {
    font-size: 24px;
    font-weight: bold;
    transition: all 0.2s ease;
  }
  &:hover {
    .iconfont{
      transform: scale(1.1);
    }
  }
}
</style>
