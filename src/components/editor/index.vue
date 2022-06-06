<template>
  <div
    class="edit_wrap"
    @click="
      colorListShow = false;
      linkShow = false;
    "
  >
    <div v-if="editor" class="buttons">
      <button
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        title="H1"
      >
        <div class="iconfont icon-heading-h1"></div>
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        title="H2"
      >
        <div class="iconfont icon-heading-h2"></div>
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        title="H3"
      >
        <div class="iconfont icon-heading-h3"></div>
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        title="H4"
      >
        <div class="iconfont icon-heading-h4"></div>
      </button>
      <button
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor.isActive('paragraph') }"
        title="段落"
      >
        <div class="iconfont icon-paragraph"></div>
      </button>
      <div class="splitLine"></div>
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
        title="加粗"
      >
        <div class="iconfont icon-bold"></div>
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
        title="斜体"
      >
        <div class="iconfont icon-italic"></div>
      </button>
      <button
        @click="editor.chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
        title="删除线"
      >
        <div class="iconfont icon-strikethrough"></div>
      </button>
      <button
        @click.stop="colorListShow = true"
        :class="{
          'is-active': editor.isActive('textStyle'),
          textColor: true,
        }"
        title="文字颜色"
      >
        <div class="iconfont icon-font-color"></div>
        <div class="colorList" v-show="colorListShow">
          <div
            class="colorItem"
            v-for="color in colorlist"
            :key="color.colorname"
            :style="{ 'background-color': color.color }"
            @click="editor.chain().focus().setColor(color.color).run()"
          ></div>
        </div>
      </button>
      <button
        @click="editor.chain().focus().toggleHighlight().run()"
        :class="{ 'is-active': editor.isActive('highlight') }"
        title="高亮"
      >
        <div class="iconfont icon-bg-color"></div>
      </button>
      <button
        @click="editor.chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code') }"
        title="代码段"
      >
        <div class="iconfont icon-code-inline"></div>
      </button>
      <button
        @click.stop="addOrRemoveLink(editor.isActive('link'))"
        :class="{ 'is-active': editor.isActive('link'), linkButton: true }"
        title="链接"
      >
        <div class="iconfont icon-link"></div>
        <div class="linkPopup" v-show="linkShow">
          <input
            type="text"
            name=""
            id=""
            class="linkInput"
            v-model="link"
            @keyup.enter="addLink"
          />
        </div>
      </button>
      <div class="splitLine"></div>

      <button
        @click="editor.chain().focus().setTextAlign('left').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
        title="左对齐"
      >
        <div class="iconfont icon-text-align-left"></div>
      </button>
      <button
        @click="editor.chain().focus().setTextAlign('center').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
        title="居中对齐"
      >
        <div class="iconfont icon-text-align-center"></div>
      </button>
      <button
        @click="editor.chain().focus().setTextAlign('right').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
        title="右对齐"
      >
        <div class="iconfont icon-text-align-right"></div>
      </button>
      <button
        @click="editor.chain().focus().setTextAlign('justify').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
        title="两端对齐"
      >
        <div class="iconfont icon-text-align-justify"></div>
      </button>
      <div class="splitLine"></div>

      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
        title="无序列表"
      >
        <div class="iconfont icon-list-disorder"></div>
      </button>
      <button
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
        title="有序列表"
      >
        <div class="iconfont icon-list-order"></div>
      </button>
      <button
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
        title="代码块"
      >
        <div class="iconfont icon-code-block"></div>
      </button>
      <button
        @click="
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        "
        :class="{ 'is-active': editor.isActive('table') }"
        title="添加表格"
      >
        <div class="iconfont icon-table-add"></div>
      </button>
      <button @click="clickAddImage">
        <div class="iconfont icon-image"></div>
        <input
          type="file"
          accept="image/*"
          @change="tirggerFile($event)"
          name="avatar"
          v-show="false"
          ref="uploadInput"
        />
      </button>

      <div class="splitLine"></div>
      <button @click="editor.chain().focus().undo().run()" title="撤销">
        <div class="iconfont icon-undo"></div>
      </button>
      <button @click="editor.chain().focus().redo().run()" title="重做">
        <div class="iconfont icon-redo"></div>
      </button>
    </div>
    <div class="buttonswrap"></div>
    <div class="textcontent">
      <div class="tablebuttons" v-if="editor && editor.isActive('table')">
        <button
          @click="editor.chain().focus().addColumnAfter().run()"
          :disabled="!editor.can().addColumnAfter()"
          title="添加列"
        >
          <div class="iconfont icon-add-column"></div>
        </button>
        <button
          @click="editor.chain().focus().deleteColumn().run()"
          :disabled="!editor.can().deleteColumn()"
          title="删除列"
        >
          <div class="iconfont icon-delete-column"></div>
        </button>
        <button
          @click="editor.chain().focus().addRowAfter().run()"
          :disabled="!editor.can().addRowAfter()"
          title="添加行"
        >
          <div class="iconfont icon-add-row"></div>
        </button>
        <button
          @click="editor.chain().focus().deleteRow().run()"
          :disabled="!editor.can().deleteRow()"
          title="删除行"
        >
          <div class="iconfont icon-delete-row"></div>
        </button>

        <button
          @click="editor.chain().focus().mergeOrSplit().run()"
          :disabled="!editor.can().mergeOrSplit()"
          title="合并拆分"
        >
          <div class="iconfont icon-table"></div>
        </button>
        <button
          @click="editor.chain().focus().toggleHeaderCell().run()"
          :disabled="!editor.can().toggleHeaderCell()"
          title="表格背景"
        >
          <div class="iconfont icon-painter"></div>
        </button>
        <button
          @click="editor.chain().focus().deleteTable().run()"
          :disabled="!editor.can().deleteTable()"
          title="删除表格"
        >
          <div class="iconfont icon-table-remove"></div>
        </button>
      </div>
      <div class="contentTitle">
        <input
          type="text"
          placeholder="请填写博客标题"
          class="blogTitle"
          v-model="articleTitle"
        />
      </div>
      <editor-content :editor="editor" />
    </div>

    <div class="submitBox">
      <div class="pic">
        <div class="leftTitle">封面：</div>
        <div class="uploadPic">
          <div class="uploadBox" @click="clickUploadCover">
            +
            <img :src="coverImg" alt="" class="coverImg" v-if="coverImg" />
          </div>
          <input
            type="file"
            accept="image/*"
            @change="uploadCover($event)"
            name="cover"
            v-show="false"
            ref="uploadCover"
          />
          <div class="ratio">封面比例：300×200</div>
        </div>
      </div>
      <div class="desc">
        <div class="leftTitle">文章摘要：</div>
        <textarea name="" id="" v-model="desc"></textarea>
      </div>
      <div class="tag">
        <div class="leftTitle">文章标签：</div>
        <Tags
          :tagList="tagList"
          tagName="标签"
          listName="tagList"
          :existList="exsitTagList"
        ></Tags>
      </div>
      <div class="category">
        <div class="leftTitle">文章分类：</div>
        <Tags
          :tagList="categoryList"
          tagName="分类"
          :limit="1"
          listName="categoryList"
          :existList="existCategoryList"
        ></Tags>
      </div>
    </div>

    <div class="submitButton">
      <d-button
        :content="$route.query.id ? '更新博客' : '发布博客'"
        @click="uploadArticle"
      ></d-button>
    </div>
    <Cropper
      :file="cropperfile"
      :ratio="1.5"
      @cutImage="uploadCuttedCover"
    ></Cropper>
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import { lowlight } from "lowlight";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import dButton from "@/components/d-button";
import Cropper from "@/components/cropper/cropper";
import Tags from "@/components/tags/tags";

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
  components: {
    EditorContent,
    dButton,
    Cropper,
    Tags,
  },

  data() {
    return {
      editor: null,
      colorListShow: false,
      linkShow: false,
      coverImg: "",
      articleTitle: "",
      desc: "",
      link: "",
      cropperfile: null,
      tagInputShow: false,
      tagInput: "",
      tagList: [],
      categoryList: [],
      exsitTagList: [],
      existCategoryList: [],
      article: "",
      localTimeOut: null,
      article_id: null,
      colorlist: [
        {
          colorname: "black",
          color: "#000000",
        },
        {
          colorname: "pink",
          color: "#ff5c8a",
        },
        {
          colorname: "lightpink",
          color: "#ff7a9e",
        },
        {
          colorname: "darkblue",
          color: "#717ff9",
        },
        {
          colorname: "blue",
          color: "#4791eb",
        },
        {
          colorname: "lightblue",
          color: "#39afea",
        },
        {
          colorname: "green",
          color: "#2bb669",
        },
        {
          colorname: "lightgreen",
          color: "#6acc19",
        },
        {
          colorname: "brown",
          color: "#e2ab12",
        },
        {
          colorname: "orange",
          color: "#ff8f57",
        },
        {
          colorname: "lightred",
          color: "#fd726d",
        },
        {
          colorname: "red",
          color: "#fd544e",
        },
      ],
    };
  },
  created() {
    this.getTags();
    this.getCategory();
  },

  mounted() {
    if (this.$route.query.id) {
      this.article_id = this.$route.query.id;
      this.getArticle();
    } else {
      if (localStorage.getItem("article")) {
        this.article = localStorage.getItem("article");
        this.articleTitle = localStorage.getItem("articleTitle");
      }
      this.renderContent();
    }
    this.saveLocal();
  },

  beforeUnmount() {
    if (this.editor) {
      this.editor.destroy();
    }
    if (this.localTimeOut) {
      clearTimeout(this.localTimeOut);
    }
    let html = this.editor.getHTML();
    console.log(this.article_id);
    if (html && html !== "<p></p>" && this.article_id === null) {
      if (html === localStorage.getItem("article")) {
        return;
      }
      localStorage.setItem("article", html);
      localStorage.setItem("articleTitle",this.articleTitle)
      ElNotification({
        title: "success",
        message: "已临时保存草稿",
        type: "success",
      });
    }
  },

  methods: {
    saveLocal() {
      this.localTimeOut = setTimeout(() => {
        let html = this.editor.getHTML();
        if (html && !this.$route.query.id) {
          localStorage.setItem("article", html);
          localStorage.setItem("articleTitle",this.articleTitle)
        }
        this.saveLocal();
      }, 1000 * 60 * 5);
    },
    getArticle() {
      this.$articleApi
        .getArticle({
          id: this.$route.query.id,
        })
        .then((res) => {
          if (res.code === 200) {
            res.data.tags = res.data.tags.split(",");
            this.article = res.data.content;
            this.coverImg = res.data.pic;
            this.desc = res.data.desc;
            this.articleTitle = res.data.title;
            this.tagList = res.data.tags;
            this.categoryList = [res.data.category];
            this.renderContent();
          }
        });
    },
    renderContent() {
      this.editor = new Editor({
        extensions: [
          StarterKit,
          CodeBlockLowlight.configure({
            lowlight,
          }),
          TextAlign.configure({
            types: ["heading", "paragraph"],
          }),
          Highlight,
          Table.configure({
            resizable: true,
          }),
          TableRow,
          TableHeader,
          CustomTableCell,
          TextStyle,
          Color,
          Image.configure({
            inline: true,
          }),
          Link.configure({
            openOnClick: false,
          }),
        ],
        content: this.article,
      });
    },
    submit() {
      const html = this.editor.getHTML();
    },
    getTags() {
      this.$articleApi.getTags().then((res) => {
        if (res.code === 200) {
          res.data.forEach((item) => {
            this.exsitTagList.push(item.tag_name);
          });
        }
      });
    },
    getCategory() {
      this.$articleApi.getCategory().then((res) => {
        if (res.code === 200) {
          res.data.forEach((item) => {
            this.existCategoryList.push(item.category_name);
          });
        }
      });
    },
    addOrRemoveLink(isLink) {
      if (isLink) {
        this.editor.chain().focus().extendMarkRange("link").unsetLink().run();
      } else {
        this.linkShow = true;
      }
    },
    addLink() {
      this.linkShow = false;
      if (this.link) {
        this.editor.chain().focus().setLink({ href: this.link }).run();
        this.link = "";
      }
    },
    tirggerFile(event) {
      let file = event.target.files[0];
      if (!this.$store.state.userInfo||this.$store.state.userInfo.email !== "799552934@qq.com") {
        let reader = new FileReader();
        // 将文件加载进入
        reader.readAsDataURL(file);
        let that = this
        reader.onload = function (e) {
          // 转换完成输出该文件base64编码
          that.editor.chain().focus().setImage({ src: this.result }).run();
        };
        return
      }
      let formdata = new FormData();
      formdata.append("file", file);
      this.$articleApi.uploadImage(formdata).then((res) => {
        if (res.code === 200) {
          this.editor.chain().focus().setImage({ src: res.data.pic }).run();
        }
      });
    },
    uploadCover(event) {
      if (!event.target.files.length) {
        return;
      }
      let file = event.target.files[0];
      this.cropperfile = file;
      event.target.value = "";
    },
    uploadCuttedCover(formdata,file) {
      if (!this.$store.state.userInfo||this.$store.state.userInfo.email !== "799552934@qq.com") {
        let reader = new FileReader();
        // 将文件加载进入
        reader.readAsDataURL(file);
        let that = this
        reader.onload = function (e) {
          // 转换完成输出该文件base64编码
          that.coverImg = this.result;
        };
        return
      }
      this.$articleApi.uploadCover(formdata).then((res) => {
        if (res.code === 200) {
          this.coverImg = res.data.pic;
        }
      });
    },
    uploadArticle() {
      // 文章标题验证
      if (!this.$store.state.userInfo||this.$store.state.userInfo.email !== "799552934@qq.com"){
        return ElNotification({
          title: "error",
          message: '暂不对外开放文章上传功能！',
          type: "error",
        });
      }
      const html = this.editor.getHTML();
      if (!this.articleTitle || html.length < 100) {
        return ElNotification({
          title: "error",
          message: !this.articleTitle ? "请填写标题！" : "博客长度过短！",
          type: "error",
        });
      }
      // 标签验证
      if (!this.tagList.length) {
        return ElNotification({
          title: "error",
          message: "请添加标签",
          type: "error",
        });
      }
      if (
        this.tagList.some((tag) => {
          return !this.exsitTagList.some((item) => {
            return item === tag;
          });
        })
      ) {
        this.addTags();
      }
      // 分类验证
      if (!this.categoryList.length) {
        return ElNotification({
          title: "error",
          message: "请选择分类",
          type: "error",
        });
      }
      if (
        this.categoryList.some((category) => {
          return !this.existCategoryList.some((item) => {
            return item === category;
          });
        })
      ) {
        this.addCategory();
      }
      if (this.$route.query.id) {
        this.$articleApi
          .updateArticle({
            article_id: this.$route.query.id,
            title: this.articleTitle,
            content: html,
            pic: this.coverImg,
            desc: this.desc,
            tags: this.tagList,
            category: this.categoryList[0],
          })
          .then((res) => {
            if (res.code === 200) {
              ElNotification({
                title: "success",
                message: res.msg,
                type: "success",
              });
              this.$router.replace("/articleList");
              if (localStorage.getItem("article")) {
                localStorage.removeItem("article");
                localStorage.removeItem("articleTitle")
              }
            }
          });
      } else {
        this.$articleApi
          .uploadArticle({
            title: this.articleTitle,
            content: html,
            pic: this.coverImg,
            desc: this.desc,
            tags: this.tagList,
            category: this.categoryList[0],
          })
          .then((res) => {
            if (res.code === 200) {
              ElNotification({
                title: "success",
                message: res.msg,
                type: "success",
              });
              this.article_id = res.data.article_id;
              if (localStorage.getItem("article")) {
                localStorage.removeItem("article");
                localStorage.removeItem("articleTitle")
              }
              this.$router.replace("/articleList");
            }
          });
      }
    },
    clickAddImage() {
      this.$refs.uploadInput.click();
    },
    clickUploadCover() {
      this.$refs.uploadCover.click();
    },
    addTags() {
      this.$articleApi.addTags(this.tagList);
    },
    addCategory() {
      this.$articleApi.addCategory(this.categoryList);
    },
  },
};
</script>

<style lang="scss">
/* Basic editor styles */
.edit_wrap {
  .buttons {
    position: fixed;
    top: 100px;
    left: 50%;
    width: 100%;
    transform: translate(-50%);
    background-color: rgba($color: #e3e3e3, $alpha: 0.8);
    backdrop-filter: blur(15px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    .is-active {
      color: white;
      background-color: #0d0d0d;
    }
    .splitLine {
      width: 2px;
      height: 20px;
      background-color: darkgray;
      margin: 0 5px;
    }
    button {
      padding: 5px;
      width: 35px;
      height: 35px;
      margin: 10px 5px;
      border-radius: 4px;
      transition: all ease-out 0.2s;
      cursor: pointer;
      position: relative;
      &:hover {
        color: white;
        background-color: #0d0d0d;
      }
      .iconfont {
        font-size: 24px;
      }
    }
  }

  .buttonswrap {
    height: 55px;
  }
  .textcontent {
    // min-height: calc(100vh - 300px);
    width: 900px;
    margin: 0 auto;
    padding: 30px;
    border: 3px solid #0d0d0d;
    border-radius: 15px;
    background-color: white;
    margin-bottom: 30px;
    position: relative;
    .tablebuttons {
      position: fixed;
      left: 22%;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      button {
        padding: 5px;
        width: 35px;
        height: 35px;
        margin: 5px 10px;
        border-radius: 4px;
        transition: all ease-out 0.2s;
        cursor: pointer;
        position: relative;
        &:hover {
          color: white;
          background-color: #0d0d0d;
        }
        .iconfont {
          font-size: 24px;
        }
      }
    }
    .contentTitle {
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid lightgray;
      .blogTitle {
        font-size: 24px;
        width: 100%;
      }
    }
  }

  .submitBox {
    width: 900px;
    margin: 0 auto;
    padding: 30px;
    border: 3px solid #0d0d0d;
    border-radius: 15px;
    background-color: white;
    margin-bottom: 30px;
    .leftTitle {
      width: 100px;
      text-align: right;
      font-size: 18px;
      font-weight: bold;
      margin-right: 20px;
      flex-shrink: 0;
    }
    .pic {
      display: flex;
      margin-bottom: 20px;
      .uploadPic {
        position: relative;
        .uploadBox {
          width: 150px;
          height: 100px;
          border: 2px dashed lightgray;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 32px;
          color: darkgray;
          border-radius: 10px;
          cursor: pointer;
          &:hover {
            opacity: 0.6;
          }
          .coverImg {
            position: absolute;
            width: 150px;
            height: 100px;
            left: -2px;
            top: -2px;
            border: 2px solid #0d0d0d;
          }
        }
        .ratio {
          position: absolute;
          right: -150px;
          bottom: 0;
          font-size: 13px;
          color: gray;
        }
      }
    }
    .desc {
      margin-bottom: 20px;
      display: flex;
      textarea {
        width: calc(100% - 120px);
        height: 100px;
        border: 2px solid #0d0d0d;
        border-radius: 10px;
        font-size: 16px;
        padding: 10px 20px;
        resize: none;
      }
    }
    .tag {
      margin-bottom: 20px;
      display: flex;
    }
    .category {
      margin-bottom: 20px;
      display: flex;
    }
  }
  .submitButton {
    width: 900px;
    margin: 0 auto 30px;
    display: flex;
    justify-content: flex-end;
    button {
      border-radius: 10px;
    }
  }
}

.textColor {
  position: relative;
  .colorList {
    display: flex;
    justify-content: center;
    position: absolute;
    cursor: default;
    width: 200px;
    height: 70px;
    z-index: 99;
    left: 0;
    top: 40px;
    background-color: #e3e3e3;
    border-radius: 10px;
    flex-wrap: wrap;
    border: 3px solid #0d0d0d;
    .colorItem {
      width: 20px;
      height: 20px;
      margin: 5px;
      cursor: pointer;
      &:hover {
        box-shadow: 0px 0px 2px 2px white;
      }
    }
  }
}
.linkButton {
  position: relative;
  .linkPopup {
    cursor: default;
    width: 200px;
    height: 50px;
    background-color: #e3e3e3;
    border-radius: 10px;
    border: 3px solid #0d0d0d;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    left: 0;
    top: 40px;
    position: absolute;
    .linkInput {
      width: 100%;
      height: 100%;
      border: 2px solid #0d0d0d;
      padding: 0 8px;
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
.tableWrapper {
  overflow-x: auto;
}

.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}
</style>