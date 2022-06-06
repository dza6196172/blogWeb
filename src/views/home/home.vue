<template>
  <div class="index">
    <!-- banner -->
    <div class="homeArticle">
      <div class="blackbg">
        <div class="articleContent">
          <div class="left">
            <div class="tags" v-if="articleList[randomNum]">
              <div class="tag">最新文章</div>
              <div
                class="tag"
                v-for="(tag, index) in articleList[randomNum].tags"
                :key="index"
              >
                {{ tag }}
              </div>
            </div>
            <div
              class="title"
              @click="
                $router.push({
                  name: 'articleDetail',
                  params: { id: articleList[randomNum].article_id },
                })
              "
            >
              {{ articleList[randomNum] && articleList[randomNum].title }}
            </div>
            <div
              class="desc"
              v-html="articleList[randomNum] && articleList[randomNum].desc"
            ></div>
          </div>
          <div class="right">
            <img
              :src="articleList[randomNum] && articleList[randomNum].pic"
              alt=""
            />
            <div class="blurImg">
              <img
                :src="articleList[randomNum] && articleList[randomNum].pic"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 网站信息 -->
    <div class="contentWrap">
      <div class="info">
        <div class="infoTitle">小杜的博客</div>
        <div class="desc">
          欢迎来到小杜的博客，本博客用以记录日常的开发过程或解题思路。<br />
          本网站采用前后端分离模式开发，前端使用vue框架，后端使用node.js+express+mysql。<br />
          服务器和数据库使用腾讯云。详情戳关于本站👇
        </div>
        <div class="buttonGroup">
          <d-button content="给我留言" @click="giveMeMessage"></d-button>
          <d-button
            content="关于本站"
            @click="$router.push('/aboutMe')"
          ></d-button>
        </div>
      </div>
      <!-- 主体预览模块 -->
      <div class="preview">
        <div class="left">
          <!-- 文章预览列表 -->
          <div class="articleList">
            <div
              class="articleItem"
              v-for="article in articleList"
              :key="article.article_id"
              @click="
                $router.push({
                  name: 'articleDetail',
                  params: { id: article.article_id },
                })
              "
            >
              <div class="articleInfo">
                <div class="time">
                  {{
                    $moment(article.create_date).format("YYYY-MM-DD HH:mm:ss")
                  }}
                </div>
                <div class="count">
                  {{ $filters.numSplit(article.watch) }}次阅读
                  <i class="iconfont icon-shuqian"></i>
                </div>
              </div>
              <div class="articleTitle">
                <div class="category">
                  {{ article.category }}
                </div>
                {{ article.title }}
              </div>
              <div class="articleContent">
                <div class="leftImage">
                  <img :src="article.pic" alt="" />
                </div>
                <div class="rightcontent">
                  <div class="content" v-html="article.desc"></div>
                  <div class="tags">
                    <div
                      class="tag"
                      v-for="(item, index) in article.tags"
                      :key="index"
                    >
                      {{ item }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="moreArticle" @click="$router.push('/articleList')">
            查看更多 <span class="iconfont">&#xe743;</span>
          </div>
        </div>
        <!-- 分类 -->
        <div class="right">
          <div class="category">
            <div class="categoryTitle">分类</div>
            <div class="categoryList">
              <div
                class="categoryItem"
                v-for="item in categoryList"
                :key="item.category_id"
                @click="
                  $router.push({
                    name: 'articleList',
                    query: { category_id: item.category_id },
                  })
                "
              >
                {{ item.category_name }}
                <div class="articleCount">{{ "(" + item.count + ")" }}</div>
              </div>
            </div>
          </div>
          <div class="category">
            <div class="categoryTitle">时间轴</div>
            <div class="categoryList">
              <div
                class="categoryItem"
                v-for="item in yearList"
                :key="item"
                @click="
                  $router.push({
                    name: 'articleList',
                    query: { year: item.year },
                  })
                "
              >
                {{ item.year }}
                <div class="articleCount">{{ "(" + item.count + ")" }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="games">
        <div
          class="gameItem"
          @click="
            $router.push({ name: 'game', query: { name: 'mineSweeper' } })
          "
        >
          <img src="@/assets/img/mineSweeper.png" alt="" />
          <div class="gameName">扫雷</div>
        </div>
        <div
          class="gameItem"
          @click="$router.push({ name: 'game', query: { name: 'snake' } })"
        >
          <img src="@/assets/img/snake.png" alt="" />
          <div class="gameName">贪吃蛇</div>
        </div>
        <div
          class="gameItem"
          @click="$router.push({ name: 'game', query: { name: 'tetris' } })"
        >
          <img src="@/assets/img/tetris.png" alt="" />
          <div class="gameName">俄罗斯方块</div>
        </div>
      </div>
      <div class="contactMe">
        <div class="contactMeWrap">
          <div class="contactMeTitle">留言</div>
          <div class="desc">
            如果您对本站有任何建议或者发现本站的bug，欢迎您给我留言。
          </div>
          <div class="yourname">
            <input
              type="text"
              placeholder="您的姓名"
              v-model="query.name"
              :disabled="isLogin"
            />
          </div>
          <div class="yourText">
            <textarea
              placeholder="请输入内容"
              v-model="query.content"
              ref="commentTextRef"
              :maxlength="300"
            ></textarea>
            <Emoji
              @inputEmoji="inputEmoji"
              @focusTextarea="focusTextarea"
            ></Emoji>
            <div class="leftText">
              还可输入{{ 300 - query.content.length }}字
            </div>
          </div>
          <d-button content="提交" @click="postMessage"></d-button>
        </div>
        <div class="message">
          <div class="messageTitle">留言板</div>
          <div class="messageList" ref="messageListRef">
            <div
              class="messageItem"
              v-for="(item, index) in messageList"
              :key="item.message_id"
            >
              <div class="messageInfo">
                <div class="avatar">
                  <img
                    :src="
                      item.avatar
                        ? item.avatar
                        : require('@/assets/img/icon_avatar.png')
                    "
                    alt=""
                  />
                </div>
                <div class="right">
                  <div class="name">
                    {{ item.nickname ? item.nickname : "可爱的网友" }}
                  </div>
                  <div class="time">
                    {{ $moment(item.date).format("YYYY-MM-DD HH:mm:ss") }}
                  </div>
                </div>
              </div>
              <div class="messageContent">
                {{ item.content }}
              </div>
            </div>
            <Pagination
              :total="messageQuery.total"
              :pageNum="messageQuery.pageNum"
              @changePage="changePage"
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dButton from "@/components/d-button";
import Emoji from "@/components/emoji/emoji";
import Pagination from "@/components/pagination/pagination";
export default {
  name: "index",
  components: {
    dButton,
    Emoji,
    Pagination,
  },
  data() {
    return {
      articleList: [],
      categoryList: [],
      yearList: [],
      messageList: [],
      query: {
        name: "",
        content: "",
      },
      messageQuery: {
        pageNum: 1,
        pageSize: 10,
        total: 100,
      },
    };
  },
  computed: {
    randomNum() {
      let max = 1;
      let min = 0;
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
    isLogin() {
      return this.$store.state.userInfo && this.$store.state.userInfo.nickname;
    },
  },
  watch: {
    userInfo(newval, oldval) {
      if (newval.nickname) {
        this.query.name = this.$store.state.userInfo.nickname;
      }
    },
  },
  mounted() {
    if (this.$store.state.userInfo && this.$store.state.userInfo.nickname) {
      this.query.name = this.$store.state.userInfo.nickname;
    }
  },
  created() {
    this.getArticleList();
    this.getCategory();
    this.getYear();
    this.getMessage();
  },
  methods: {
    getArticleList() {
      this.$articleApi
        .getArticleList({
          pageSize: 2,
          pageNum: 1,
        })
        .then((res) => {
          if (res.code === 200) {
            res.data.articleList.forEach((item) => {
              if (item.desc) {
                item.desc = item.desc.replace(/\n/g, "<br />");
              }
              item.tags = item.tags.split(",");
            });
            this.articleList = res.data.articleList;
          }
        });
    },
    giveMeMessage() {
      let box = document.getElementById("mainContent");
      box.scrollTo({
        top: box.scrollHeight,
        behavior: "smooth",
      });
    },
    getCategory() {
      this.$articleApi.getCategory().then((res) => {
        if (res.code === 200) {
          this.categoryList = res.data;
        }
      });
    },
    getYear() {
      this.$articleApi.getYear().then((res) => {
        if (res.code === 200) {
          this.yearList = res.data;
        }
      });
    },
    inputEmoji(emoji) {
      let position = this.$refs.commentTextRef.selectionStart;
      this.query.content =
        this.query.content.slice(0, position) +
        emoji +
        this.query.content.slice(position);
      setTimeout(() => {
        this.$refs.commentTextRef.focus();
        this.$refs.commentTextRef.setSelectionRange(position + 2, position + 2);
      }, 0);
    },
    focusTextarea() {
      this.$refs.commentTextRef.focus();
    },
    changePage(page) {
      this.messageQuery.pageNum = page;
      this.getMessage();
      this.$refs.messageListRef.scrollTo(0, 0);
    },
    getMessage() {
      this.$userApi.getMessage(this.messageQuery).then((res) => {
        if (res.code === 200) {
          this.messageList = res.data.messageList;
          this.messageQuery.total = res.data.total;
        }
      });
    },
    postMessage() {
      if (!this.query.name || !this.query.content) {
        return ElNotification({
          title: "error",
          message: !this.query.name ? "请填写姓名" : "请填写内容",
          type: "error",
        });
      }
      this.$userApi.postMessage(this.query).then((res) => {
        if (res.code === 200) {
          ElNotification({
            title: "success",
            message: "添加留言成功！",
            type: "success",
          });
          this.query.content = "";
          this.getMessage();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
  min-height: calc(100vh - 100px);
  width: 100%;
  margin: 0 auto;
  padding-bottom: 50px;
  .homeArticle {
    width: 100%;
    height: calc(100vh - 100px);
    max-height: 850px;
    position: relative;
    .blackbg {
      background-color: #0d0d0d;
      height: 80%;
    }
    .articleContent {
      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      left: 0;
      top: 0;
      .left {
        width: 40%;
        margin-right: 50px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: white;
        .tags {
          display: flex;
          margin-bottom: 20px;
          .tag {
            padding: 5px 10px;
            border: 1px solid #e3e3e3;
            border-radius: 5px;
            font-size: 12px;
            margin-right: 10px;
          }
        }
        .title {
          font-weight: bold;
          font-size: 40px;
          line-height: 50px;
          margin-bottom: 30px;
          cursor: pointer;
          &:hover {
            color: rgba($color: #e3e3e3, $alpha: 1);
          }
        }
        .desc {
          line-height: 24px;
        }
      }
      .right {
        // width: 50%;
        width: 38%;
        height: 80%;
        margin-bottom: 5%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        position: relative;
        box-shadow: 0px 3px 15px 1px #0d0d0d;
        .blurImg {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: auto;
            height: 120%;
            filter: blur(9px);
          }
        }
        img {
          width: 100%;
          height: auto;
          z-index: 1;
          // height: 100%;
        }
      }
    }
  }
  .contentWrap {
    min-width: 900px;
    max-width: 1360px;
    margin: 0 auto;
  }
  .info {
    padding: 50px;
    margin: 0 50px;
    background-color: white;
    text-align: center;
    border-radius: 15px;
    border: 3px solid #0d0d0d;
    .infoTitle {
      font-size: 24px;
      font-weight: bold;
      line-height: 30px;
      margin-bottom: 20px;
    }
    .desc {
      line-height: 30px;
    }
    .contactme {
      margin: 0 auto;
      margin-top: 20px;
    }
    .buttonGroup {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      .d-button:first-of-type {
        margin-right: 20px;
      }
    }
  }
  .preview {
    padding: 0 50px;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    .left {
      width: 77%;
      .moreArticle {
        text-align: right;
        margin-bottom: 30px;
        margin-top: -15px;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      .articleList {
        .articleItem {
          cursor: pointer;
          padding: 40px 30px;
          background-color: white;
          margin-bottom: 30px;
          // height: 380px;
          border: 3px solid #0d0d0d;
          border-radius: 15px;
          .articleInfo {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: gray;
            font-size: 12px;
            margin-bottom: 15px;
            .time {
              font-size: 13px;
            }
            .count {
              font-size: 13px;
              display: flex;
              align-items: center;
            }
          }
          .articleTitle {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 20px;
            cursor: pointer;
            transition: all ease 0.3s;
            display: flex;
            .category {
              border: 2px solid gray;
              border-radius: 8px;
              padding: 3px 6px;
              font-size: 13px;
              margin-right: 10px;
              background-color: rgba($color: lightgray, $alpha: 0.4);
            }
            &:hover {
              opacity: 0.8;
            }
          }
          .articleContent {
            display: flex;
            justify-content: space-between;
            .leftImage {
              width: 300px;
              height: 200px;
              flex-shrink: 0;
              margin-right: 20px;
              overflow: hidden;
              &:hover {
                img {
                  transform: scale(1.2);
                }
              }
              img {
                transition: all ease 1s;
                width: 100%;
                height: 100%;
              }
            }
            .rightcontent {
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .content {
                width: 100%;
                font-size: 13px;
                color: #666;
                line-height: 24px;
                padding-top: 10px;
              }
              .tags {
                display: flex;
                margin-top: 20px;
                margin-left: auto;
                .tag {
                  padding: 5px 10px;
                  border-radius: 8px;
                  background-color: rgba($color: #43b885, $alpha: 0.2);
                  margin-right: 10px;
                  font-size: 13px;
                }
              }
            }
          }
        }
      }
    }
    .right {
      width: 20%;
      .category {
        background-color: white;
        padding: 30px;
        margin-bottom: 30px;
        border: 3px solid #0d0d0d;
        border-radius: 15px;
        .categoryTitle {
          font-size: 20px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 30px;
        }
        .categoryList {
          &::-webkit-scrollbar {
            /*滚动条整体样式*/
            width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
            height: 1px;
          }
          .categoryItem {
            display: flex;
            font-size: 13px;
            color: #666;
            line-height: 24px;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
            .articleCount {
              color: palevioletred;
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
  .games {
    height: 300px;
    background-color: #0d0d0d;
    width: 100vw;
    margin-left: calc((1360px - 100vw) / 2 - 3px);
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    .gameItem {
      width: 240px;
      height: 75%;
      background-color: white;
      transform: skewX(-15deg);
      overflow: hidden;
      position: relative;
      margin-right: 30px;
      cursor: pointer;
      transition: all ease 0.4s;
      &:hover {
        width: 320px;
        .gameName {
          opacity: 1;
        }
      }
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-48%, -50%) skewX(15deg);
        width: 450px;
        height: 120%;
      }
      .gameName {
        transition: all ease 0.4s;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-48%, -50%) skewX(15deg);
        z-index: 1;
        color: white;
        font-weight: bold;
        font-size: 32px;
        width: 150%;
        height: 100%;
        background-color: rgba($color: #000000, $alpha: 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
      }
    }
  }
  .contactMe {
    padding: 0 50px;
    display: flex;
    justify-content: space-between;
    .contactMeWrap {
      height: 450px;
      width: 49%;
      border-radius: 15px;
      border: 3px solid #0d0d0d;
      background-color: white;
      padding: 30px;
      .contactMeTitle {
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 20px;
      }
      .desc {
        font-size: 13px;
        color: darkgray;
        margin-bottom: 20px;
      }
      .yourname {
        margin-bottom: 20px;
        input {
          border: 2px solid #0d0d0d;
          border-radius: 10px;
          padding: 10px;
          width: 200px;
          &:disabled {
            background-color: #f2f2f2;
          }
        }
      }
      .yourText {
        margin-bottom: 20px;
        position: relative;
        textarea {
          width: 100%;
          border: 2px solid #0d0d0d;
          border-radius: 10px;
          resize: none;
          padding: 10px;
          font-family: Microsoft YaHei;
          height: 200px;
        }
        .leftText {
          position: absolute;
          right: 50px;
          bottom: 18px;
          font-size: 13px;
          color: gray;
        }
        .emoji {
          position: absolute;
          right: 20px;
          bottom: 10px;
        }
      }
      .d-button {
        padding: 10px 30px;
        width: 200px;
      }
    }
    .message {
      height: 450px;
      width: 48.5%;
      border-radius: 15px;
      border: 3px solid #0d0d0d;
      background-color: white;
      padding: 30px;
      position: relative;
      .messageTitle {
        font-weight: bold;
        font-size: 20px;
        position: sticky;
        top: 0;
        margin-bottom: 20px;
      }
      .messageList {
        height: 350px;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          width: 0;
        }
        .messageItem {
          padding: 20px;
          background-color: rgba($color: #666, $alpha: 0.1);
          margin-bottom: 20px;
          &:last-of-type {
            margin-bottom: 0;
          }
          .messageInfo {
            display: flex;
            align-items: center;
            .avatar {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              border: 2px solid #0d0d0d;
              overflow: hidden;
              margin-right: 20px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .right {
              .name {
                font-size: 18px;
                font-weight: bold;
              }
              .time {
                margin-top: 5px;
                font-size: 13px;
                color: gray;
              }
            }
          }
          .messageContent {
            margin-top: 15px;
            line-height: 24px;
          }
        }
      }
    }
  }
}
</style>
