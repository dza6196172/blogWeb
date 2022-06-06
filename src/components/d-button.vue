<template>
  <button class="d-button" :disabled="disabled">
    <div class="content" v-if="!loading">{{ content }}</div>
    <div class="loading" v-else>
      <div class="loadingblock" :style="`border-color: ${circleColor} ${circleColor} transparent transparent;`"></div>
    </div>
    <div class="mask"></div>
  </button>
</template>

<script>
export default {
  name: "d-button",
  props: {
    content: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    circleColor:{
      type: String,
      default: "#f6f6f6",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.d-button {
  width: fit-content;
  background-color: #202020;
  padding: 15px 30px;
  font-size: 14px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  .mask{
    position: absolute;
    width: 0%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba($color: white, $alpha: 0.5);
    transition: all 0.2s ease-in;
    z-index: 1;
  }
  &:hover {
    .mask {
      width: 100% !important;
    }
  }
  .content{
    position: relative;
    z-index: 2;
  }
  .loading {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 3px solid transparent;
    position: absolute;
    transform: translate(-50%,-50%);
    z-index: 2;
    animation: rotation 1s cubic-bezier(0.25, 0, 0.75, 1) infinite;
    .loadingblock {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 3px solid;
      position: absolute;
      left: -3px;
      top: -3px;
    }
  }
  @keyframes rotation {
    0% {
      transform: rotate(0);
      transform-origin: 50% 50%;
    }
    100%{
      transform: rotate(360deg);
    }
  }
}
</style>
