<template>
  <div class="toBottom" title="回到底部">
    <div class="iconfont">&#xe621;</div>
  </div>
</template>

<script>
export default {
  name: "to-bottom",
};
</script>

<style lang="scss" scoped>
.toBottom {
  position: fixed;
  right: 100px;
  bottom: 200px;
  transition: all ease 0.2s;
  width: 50px;
  height: 50px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0d0d0d;
  border-radius: 50%;
  transform: rotate(180deg);
  cursor: pointer;
  .iconfont {
    font-size: 24px;
    font-weight: bold;
    transition: all 0.2s ease;
  }
  &:hover {
    .iconfont {
      transform: scale(1.1);
    }
  }
}
</style>
