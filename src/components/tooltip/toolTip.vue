<template>
  <div class="tooltip">
    <!-- {{ item.date }}<br /> -->
    <div v-html="content"></div>
  </div>
</template>

<script>
export default {
  name: "tool-tip",
  props:{
    content:{
      type:String,
      default(){
        return ''
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tooltip {
  position: absolute;
  bottom: 30px;
  // max-width: 84px;
  padding: 4px 8px;
  background-color: #0d0d0d;
  opacity: 0;
  visibility: hidden;
  left: 50%;
  line-height: 16px;
  transform: translateX(-50%);
  color: white;
  z-index: 3;
  border-radius: 5px;
  transition: all ease 0.4s;
  cursor: default;
  font-size: 12px;
  :deep div{
    font-size: 12px;
  }
  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #0d0d0d;
    position: absolute;
    right: 44%;
    bottom: -5px;
    transform: rotate(180deg);
  }
}
</style>
