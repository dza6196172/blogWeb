<template>
  <div class="aboutMe" ref="aboutMeRef">
    <div class="leftMenu">
      <div
        :class="{
          menu1: true,
          menu_active: currentPosition === 'introduction',
        }"
        @click="jumpTo('introduction')"
      >
        简介
      </div>
      <div
        :class="{ menu1: true, menu_active: currentPosition === 'function' }"
        @click="jumpTo('function')"
      >
        功能介绍
      </div>
      <div
        :class="{
          menu2: true,
          menu_active: currentPosition === 'loginRegister',
        }"
        @click="jumpTo('loginRegister')"
      >
        登录/注册
      </div>
      <div
        :class="{ menu2: true, menu_active: currentPosition === 'articleList' }"
        @click="jumpTo('articleList')"
      >
        文章列表
      </div>
      <div
        :class="{
          menu2: true,
          menu_active: currentPosition === 'articleComment',
        }"
        @click="jumpTo('articleComment')"
      >
        文章/评论
      </div>
      <div
        :class="{
          menu2: true,
          menu_active: currentPosition === 'writeArticle',
        }"
        @click="jumpTo('writeArticle')"
      >
        写文章
      </div>
      <div
        :class="{
          menu2: true,
          menu_active: currentPosition === 'statistics',
        }"
        @click="jumpTo('statistics')"
      >
        统计
      </div>
      <div
        :class="{
          menu2: true,
          menu_active: currentPosition === 'games',
        }"
        @click="jumpTo('games')"
      >
        小游戏
      </div>
      <div
        :class="{
          menu2: true,
          menu_active: currentPosition === 'userInfo',
        }"
        @click="jumpTo('userInfo')"
      >
        个人中心
      </div>
      <!-- <div
        :class="{
          menu1: true,
          menu_active: currentPosition === 'selfIntroduction',
        }"
        @click="jumpTo('selfIntroduction')"
      >
        关于我
      </div> -->
    </div>
    <div class="rightContent">
      <!-- 简介 -->
      <div ref="introductionRef">
        <introduction></introduction>
      </div>

      <div id="function" class="content">
        <div class="title" ref="functionRef">功能介绍</div>
        <!-- 登录/注册 -->
        <div ref="loginRegisterRef">
          <loginRegister></loginRegister>
        </div>
        <!-- 文章列表 -->
        <div ref="articleListRef">
          <articleList></articleList>
        </div>
        <!-- 文章/评论 -->
        <div ref="articleCommentRef">
          <articleComment></articleComment>
        </div>
        <div ref="writeArticleRef">
          <writeArticle></writeArticle>
        </div>
        <div ref="statisticsRef">
          <statistics></statistics>
        </div>
        <div ref="gamesRef">
          <games></games>
        </div>
        <div ref="userInfoRef">
          <userInfo></userInfo>
        </div>
        <!-- <div ref="selfIntroductionRef">
          <selfIntroduction></selfIntroduction>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Introduction from "./introduction.vue";
import loginRegister from "./loginRegister.vue";
import articleList from "./articleList.vue";
import articleComment from "./articleComment.vue";
import writeArticle from "./writeArticle.vue";
import statistics from "./statistics.vue";
import selfIntroduction from "./selfIntroduction.vue";
import games from "./games.vue";
import userInfo from "./userInfo.vue";
import { throttle } from "@/utils/tools.js";
export default {
  name: "about-me",
  components: {
    Introduction,
    loginRegister,
    articleList,
    articleComment,
    writeArticle,
    statistics,
    selfIntroduction,
    games,
    userInfo
  },
  data() {
    return {
      refList: [
        {
          name: "introduction",
          position: 0,
        },
        {
          name: "function",
          position: 0,
        },
        {
          name: "loginRegister",
          position: 0,
        },
        {
          name: "articleList",
          position: 0,
        },
        {
          name: "articleComment",
          position: 0,
        },
        {
          name: "writeArticle",
          position: 0,
        },
        {
          name: "statistics",
          position: 0,
        },
        {
          name: "games",
          position: 0,
        },
        {
          name: "userInfo",
          position: 0,
        },
        // {
        //   name: "selfIntroduction",
        //   position: 0,
        // },
      ],
      currentPosition: "introduction",
      scrollBox: null,
    };
  },
  mounted() {
    this.scrollBox = document.getElementById("mainContent");
    this.scrollBox.addEventListener("scroll", this.nowPosition, false);
  },
  beforeUnmount() {
    this.scrollBox.removeEventListener("scroll", this.nowPosition, false);
  },
  methods: {
    nowPosition: throttle(function () {
      if (this.refList[0].position === 0) {
        this.refList.forEach((item, index) => {
          item.position = this.$refs[item.name + "Ref"].offsetTop;
        });
      }

      if (this.scrollBox.scrollTop < this.refList[0].position) {
        return (this.currentPosition = this.refList[0].name);
      }
      for (let i = 0; i < this.refList.length; i++) {
        if (
          i < this.refList.length - 1 &&
          this.scrollBox.scrollTop >= this.refList[i].position - 10 &&
          this.scrollBox.scrollTop < this.refList[i + 1].position - 10
        ) {
          this.currentPosition = this.refList[i].name;
          break;
        }
        this.currentPosition = this.refList[i].name;
      }
    }, 200),
    jumpTo(ref) {
      if (ref === "introduction") {
        return document.getElementById("mainContent").scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
      var element = this.$refs[ref + "Ref"];

      document.getElementById("mainContent").scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
      setTimeout(() => {
        if (this.currentPosition === ref) this.currentPosition = ref;
      }, 1000);
    },
  },
};
</script>
    

<style lang="scss" scoped>
@import "@/assets/css/aboutMe.scss";
.aboutMe {
  min-height: calc(100vh - 200px);
  min-width: 900px;
  max-width: 1360px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  position: relative;

  .leftMenu {
    width: 20%;
    height: 100%;
    position: sticky;
    flex-shrink: 0;
    top: 100px;
    left: 0;
    height: calc(100vh - 200px);
    padding:  30px;
    .menu_active {
      border-right: 5px solid #43b885;
      font-weight: bold;
    }
    .menu1 {
      font-size: 16px;
      line-height: 28px;
      cursor: pointer;
    }
    .menu2 {
      font-size: 15px;
      line-height: 28px;
      padding-left: 30px;
      cursor: pointer;
    }
  }
  .rightContent {
    padding: 30px 60px;
    min-height: calc(100vh - 200px);
    border-left: 1px solid lightgray;
    text-align: justify;
    width: 100%;
  }
}
</style>
