<template>
  <div class="index">
    <div class="headerNav">
      <header-nav :isNotTop="isNotTop"></header-nav>
    </div>
    <div class="mainContent" ref="contentRef" id="mainContent">
      <div class="headerplace"></div>
      <router-view />
      <to-top @click="backToTop" :class="{ isNotTop: !isNotTop }"></to-top>
      <to-bottom @click="goToBottom" v-if="$route.path === '/edit'"></to-bottom>
      <footer-nav></footer-nav>
    </div>
  </div>
</template>

<script>
import headerNav from "@/components/headerNav";
import footerNav from "@/components/footerNav";
import toTop from "@/components/toTop";
import toBottom from "@/components/toBottom";
export default {
  name: "index",
  components: {
    headerNav,
    footerNav,
    toTop,
    toBottom
  },
  data() {
    return {
      isNotTop: false,
    };
  },
  mounted() {
    let box = this.$refs.contentRef;
    box.addEventListener("scroll", () => {
      if (box && box.scrollTop !== 0) {
        this.isNotTop = true;
      } else {
        this.isNotTop = false;
      }
    });
  },
  methods: {
    backToTop() {
      this.$refs.contentRef.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    goToBottom(){
      this.$refs.contentRef.scrollTo({
        top: this.$refs.contentRef.scrollHeight,
        behavior: "smooth",
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.headerNav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 102;
}
.headerplace {
  height: 100px;
  width: 100%;
}
.mainContent {
  height: 100vh;
  overflow-y: scroll;
  // height: calc(100vh - 100px);
  position: relative;
  .toTop {
    position: fixed;
    right: 100px;
    bottom: 130px;
    transition: all ease 0.2s;
  }
  .isNotTop {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
