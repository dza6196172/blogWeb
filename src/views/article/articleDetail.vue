<template>
  <div class="articleDetail">
    <div class="article">
      <div class="articleTitle">
        <div class="category">{{ article.category }}</div>
        {{ article.title }}
      </div>
      <div class="articleInfo">
        <div class="line1">
          <div class="left">
            <div class="watch">
              <div class="iconfont">&#xe6bd;</div>
              {{ article.watch }}
            </div>
            <!-- <div class="thumbsup">
              <div class="iconfont">&#xe6b6;</div>
              {{ article.thumbsup }}
            </div> -->
            <div class="commentCount" @click="gotoComment">
              <div class="iconfont">&#xe8b9;</div>
              {{ commentList.length }}
            </div>
          </div>

          <div class="createTime">
            发布时间：{{
              $moment(article.create_date).format("YYYY-MM-DD HH:mm:ss")
            }}
          </div>
        </div>
        <div class="tags">
          <div class="tag" v-for="(item, index) in article.tags" :key="index">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="articleContent">
        <editor-content :editor="editor" />
      </div>
    </div>
    <div class="lastAndNext">
      <div class="last" :class="{isGray:!article.last}" @click="goToLast(article.last)">
        <div class="lastIcon"></div>
        <div class="lastOne">上一篇</div> 
        <div class="articleName">{{article.lastTitle}}</div>
      </div>
      <div class="next" :class="{isGray:!article.next}" @click="goToLast(article.next)">
        <div class="articleName">{{article.nextTitle}}</div>
        <div class="nextOne" v-if="article.next">下一篇</div> 
        <div class="nextIcon" v-if="article.next"></div>
      </div>
    </div>
    <div class="comment" ref="commentRef">
      <div class="commentTitle">评论</div>
      <div class="commentBox">
        <div class="restText">还可以输入{{ 300 - comment.length }}个字</div>
        <textarea
          name=""
          id=""
          v-model="comment"
          maxlength="300"
          ref="commentTextRef"
        ></textarea>
        <Emoji @inputEmoji="inputEmoji" @click="focusTextarea"></Emoji>
        <d-button content="提交" @click="sendComment"></d-button>
      </div>
      <div class="commentList">
        <div
          class="commentItem"
          v-for="(item, index) in commentList"
          :key="item.comment_id"
        >
          <div class="commentInfo">
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
                {{
                  item.nickname
                    ? item.nickname
                    : item.email
                    ? item.email
                    : "可爱的网友"
                }}
              </div>
              <div class="time">
                {{ $moment(item.date).format("YYYY-MM-DD HH:mm:ss") }}
              </div>
            </div>
          </div>
          <div class="commentContent">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="goToEdit"
      v-if="$store.state.userInfo.email === '799552934@qq.com'"
      @click="
        $router.push({ path: '/edit', query: { id: this.$route.params.id } })
      "
    >
      <div class="iconfont icon-pencil"></div>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
// import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
// import { lowlight } from "lowlight";
// const hljs = require('highlight.js');
import hljs from "highlight.js";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Emoji from "@/components/emoji/emoji";
import { debounce } from "@/utils/tools.js";

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),

      // and add a new one …
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-background-color"),
        renderHTML: (attributes) => {
          return {
            "data-background-color": attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },
});

export default {
  name: "articleDetail",
  data() {
    return {
      article: {},
      editor: null,
      comment: "",
      commentList: [],
    };
  },
  components: {
    Emoji,
    EditorContent,
  },
  mounted() {
    this.getArticle();
    this.getComment();
  },
  watch: {
    '$route.params.id'(newval,oldval){
      if(newval&&newval !== oldval){
        this.editor.destroy();
        this.getArticle();
        this.getComment();
      }
    }
  },
  beforeUnmount() {
    if (this.editor) {
      this.editor.destroy();
    }
  },
  methods: {
    highLightCode() {
      document.querySelectorAll("pre code").forEach((el) => {
        hljs.highlightElement(el);
      });
    },
    getArticle() {
      this.$articleApi
        .getArticle({
          id: this.$route.params.id,
        })
        .then((res) => {
          if (res.code === 200) {
            res.data.tags = res.data.tags.split(",");
            this.article = res.data;
            this.renderContent();
          }
        });
    },
    inputEmoji(emoji) {
      let position = this.$refs.commentTextRef.selectionStart;
      this.comment =
        this.comment.slice(0, position) + emoji + this.comment.slice(position);
      setTimeout(() => {
        this.$refs.commentTextRef.focus();
        this.$refs.commentTextRef.setSelectionRange(position + 2, position + 2);
      }, 0);
    },
    focusTextarea() {
      this.$refs.commentTextRef.focus();
    },
    sendComment: debounce(function () {
      if (!this.comment) {
        return ElNotification({
          title: "error",
          message: "评论不能为空！",
          type: "error",
        });
      }
      this.$articleApi
        .sendComment({
          comment: this.comment,
          article_id: this.$route.params.id,
        })
        .then((res) => {
          if (res.code === 200) {
            ElNotification({
              title: "success",
              message: "评论成功",
              type: "success",
            });
            this.comment = "";
            this.getComment();
          }
        });
    }),
    getComment() {
      this.$articleApi
        .getComment({
          id: this.$route.params.id,
        })
        .then((res) => {
          if (res.code === 200) {
            this.commentList = res.data;
          }
        });
    },
    gotoComment() {
      this.$refs.commentRef.scrollIntoView({
        behavior: "smooth",
      });
    },
    goToLast(id){
      if(!id){
        return
      }
      this.$router.push({name:'articleDetail',params:{id:id}})
    },
    renderContent() {
      this.editor = new Editor({
        extensions: [
          StarterKit,
          // CodeBlockLowlight.configure({
          //   hljs,
          // }),
          TextAlign.configure({
            types: ["heading", "paragraph"],
          }),
          Highlight,
          Table,
          TableRow,
          TableHeader,
          CustomTableCell,
          TextStyle,
          Color,
          Image.configure({
            inline: true,
          }),
          Link,
        ],
        editable: false,
        content: this.article.content,
      });
      setTimeout(() => {
        this.highLightCode();
      }, 0);
    },
  },
};
</script>

<style lang="scss">
.articleDetail {
  min-height: calc(100vh - 200px);
  padding-top: 20px;
  padding-bottom: 30px;
  .article {
    width: 1000px;
    background-color: white;
    margin: 0 auto;
    padding: 30px;
    .articleTitle {
      font-size: 24px;
      font-weight: bold;
      padding-bottom: 20px;
      border-bottom: 1px solid lightgray;
      margin-bottom: 10px;
      display: flex;
      .category {
        border: 2px solid gray;
        border-radius: 8px;
        padding: 3px 6px;
        font-size: 13px;
        margin-right: 10px;
        background-color: rgba($color: lightgray, $alpha: 0.4);
      }
    }
    .line1 {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;
        .watch,
        .thumbsup,
        .commentCount {
          display: flex;
          align-items: center;
          margin-right: 20px;
          .iconfont {
            margin-right: 5px;
            font-weight: bold;
          }
        }
        .commentCount {
          cursor: pointer;
        }
      }

      .createTime {
        font-size: 14px;
        color: #666;
        text-align: right;
      }
    }
    .tags {
      display: flex;
      margin-bottom: 20px;
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
  .lastAndNext{
    width: 1000px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    .isGray{
      background-color: rgba($color: white, $alpha: 0.8)!important;
      cursor: default!important;
    }
    .last,.next{
      width: 490px;
      height: 50px;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      cursor: pointer;
      &:hover{
        color: #43b885;
        .lastIcon{
          &::after{
            right: 0px;
          }
          &::before{
            right: 40px;
          }
        }
        .nextIcon{
          &::after{
            right: 0px;
          }
          &::before{
            right: -40px;
          }
        }
      }
      .lastIcon{
        font-size: 24px;
        position: relative;
        width: 25px;
        height: 20px;
        overflow: hidden;
        &::before{
          content: '\e745';
          font-family: 'iconfont';
          position: absolute;
          right: 0px;
          top: 0;
          transition: all linear 0.2s;
        }
        &::after{
          content: '\e745';
          font-family: 'iconfont';
          position: absolute;
          right: -40px;
          top: 0;
          transition: all linear 0.2s;
        }
      }
      .nextIcon{
        @extend .lastIcon;
        &::before{
          content: '\e743';
          right: 0px;
        }
        &::after{
          content: '\e743';
          right: 40px;
        }
      }
      .articleName{
        width: 350px;
        margin-left: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .goToEdit {
    position: fixed;
    bottom: 200px;
    right: 100px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #0d0d0d;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    cursor: pointer;
    .iconfont {
      transition: all ease-out 0.2s;
    }
    &:hover {
      .iconfont {
        transform: rotate(360deg);
      }
    }
  }
  .comment {
    width: 1000px;
    margin: 20px auto 0;
    background-color: white;
    padding: 30px;
    .commentTitle {
      font-size: 24px;
      font-weight: bold;
    }
    .commentBox {
      position: relative;
      margin-top: 20px;
      border: 3px solid #0d0d0d;
      border-radius: 10px;
      height: 140px;
      .restText {
        position: absolute;
        right: 120px;
        bottom: 18px;
        font-size: 12px;
        color: gray;
      }
      textarea {
        width: 100%;
        height: 90px;
        resize: none;
        padding: 5px 10px;
        font-size: 16px;
        font-family: Microsoft Yahei;
      }
      .emoji {
        position: absolute;
        right: 90px;
        bottom: 10px;
      }
      .d-button {
        border-radius: 8px;
        padding: 6px 20px;
        position: absolute;
        right: 10px;
        bottom: 8px;
      }
    }
    .commentList {
      padding-top: 20px;
      .commentItem {
        padding: 20px;
        background-color: rgba($color: #666, $alpha: 0.1);
        margin-bottom: 20px;
        &:last-of-type {
          margin-bottom: 0;
        }
        .commentInfo {
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
        .commentContent {
          margin-top: 15px;
          line-height: 24px;
        }
      }
    }
  }
}
.ProseMirror-focused {
  outline: none;
}
.ProseMirror {
  min-height: calc(100vh - 350px);
  > * + * {
    margin-top: 0.75em;
  }
  ul,
  ol {
    padding: 0 1rem;
    line-height: 24px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    line-height: 24px;
  }

  a {
    color: #70cff8;
    span {
      color: #70cff8 !important;
    }
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  mark {
    background-color: #faf594;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 14px;
      line-height: 24px;
      font-family: Consolas, Inconsolata, Courier, monospace, PingFang SC,
        Microsoft YaHei, sans-serif;
    }
  }

  img {
    max-width: 60%;
    max-height: 600px;
    height: auto;
    display: flex;
    margin: 0 auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }
  .hljs-comment,
  .hljs-quote {
    color: #616161;
  }

  .hljs-variable,
  .hljs-template-variable,
  .hljs-attribute,
  .hljs-tag,
  .hljs-name,
  .hljs-regexp,
  .hljs-link,
  .hljs-name,
  .hljs-selector-id,
  .hljs-selector-class {
    color: #f98181;
  }

  .hljs-number,
  .hljs-meta,
  .hljs-built_in,
  .hljs-builtin-name,
  .hljs-literal,
  .hljs-type,
  .hljs-params {
    color: #fbbc88;
  }

  .hljs-string,
  .hljs-symbol,
  .hljs-bullet {
    color: #b9f18d;
  }

  .hljs-title,
  .hljs-section {
    color: #faf594;
  }

  .hljs-keyword,
  .hljs-selector-tag {
    color: #70cff8;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: 700;
  }

  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: #f1f3f5;
    }

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }

    p {
      margin: 0;
    }
  }
}
</style>