<template>
  <div id="appWrap">
    <router-view />
  </div>
</template>

<script>


export default {
  name: "app",
};
</script>

<style lang="scss">
#appWrap {
  background-color: #e3e3e3;
  overflow: hidden;
}
.el-loading-spinner .path{
  stroke: #020202!important;
}
</style>
