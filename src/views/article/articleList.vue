<template>
  <div class="article">
    <div class="tabs">
      <el-tabs
        v-model="categoryName"
        class="demo-tabs"
        @tab-click="changeCategory"
      >
        <el-tab-pane label="全部" :name="null"></el-tab-pane>
        <el-tab-pane
          :label="category.category_name"
          :name="category.category_id"
          v-for="category in categoryList"
          :key="category.category_id"
        ></el-tab-pane>
      </el-tabs>
      <el-tabs v-model="dateName" class="demo-tabs" @tab-click="changeYear">
        <el-tab-pane label="全部" :name="null"></el-tab-pane>
        <el-tab-pane
          :label="year.year"
          :name="year.year"
          v-for="year in yearList"
          :key="year.year"
        ></el-tab-pane>
      </el-tabs>
      <div class="tagList">
        <div
          :class="{ tagItem: true, tagItem_active: !query.tagList.length }"
          @click="query.tagList = []"
        >
          全部
        </div>
        <div
          :class="{
            tagItem: true,
            tagItem_active: query.tagList.some((item) => {
              return item === tag.tag_id;
            }),
          }"
          v-for="tag in tagList"
          :key="tag.tag_id"
          @click="chooseTag(tag.tag_id)"
        >
          {{ tag.tag_name }}
        </div>
        <d-button content="确认" @click="confirmTags"></d-button>
      </div>
    </div>
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
            {{ $moment(article.create_date).format("YYYY-MM-DD HH:mm:ss") }}
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
      <pagination :total="query.total" :pageSize="query.pageSize" :pageNum="query.pageNum" @changePage="changePage"></pagination>
    </div>
    <div class="noData" v-if="!articleList.length">无文章数据</div>
    <div class="goToEdit" @click="$router.push('/edit')">
      <div class="iconfont icon-pencil"></div>
    </div>
    <div :class="{ search: true, searchActive: isSearching }" ref="searchRef">
      <input
        type="text"
        v-show="isSearching"
        v-model="keyword"
        @keyup.enter="searchArticle"
        ref="searchInputRef"
      />
      <div class="iconfont" @click="searchArticle">&#xe67e;</div>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/pagination/pagination'
export default {
  name: "article-list",
  data() {
    return {
      articleList: [],
      categoryList: [],
      tagList: [],
      yearList: [],
      categoryName: null,
      dateName: null,
      keyword: "",
      query: {
        pageSize: 10,
        pageNum: 1,
        category_id: null,
        tagList: [],
        date: null,
        total:0,
      },
      isSearching: false,
    };
  },
  components:{
    pagination
  },
  created() {
    if (this.$route.query.category_id) {
      this.categoryName = parseInt(this.$route.query.category_id);
      this.query.category_id = this.$route.query.category_id;
    }
    if (this.$route.query.year) {
      this.dateName = parseInt(this.$route.query.year);
      this.query.date = this.$route.query.year;
    }
    this.getArticleList();
    this.getCategory();
    this.getTags();
    this.getYear();
  },
  mounted() {
    document.addEventListener("mouseup", (event) => {
      var searchRef = this.$refs.searchRef;
      if (searchRef) {
        if (!searchRef.contains(event.target)) {
          this.isSearching = false;
        }
      }
    });
  },
  methods: {
    getArticleList() {
      this.$articleApi.getArticleList(this.query).then((res) => {
        if (res.code === 200) {
          res.data.articleList.forEach((item) => {
            if (item.desc) {
              item.desc = item.desc.replace(/\n/g, "<br />");
            }
            item.tags = item.tags.split(",");
          });
          this.articleList = res.data.articleList;
          this.query.total = res.data.total
        }
      });
    },
    changePage(page){
      this.query.pageNum = page
      document.getElementById('mainContent').scrollTo({
        top:0,
        behavior:'smooth'
      })
      this.getArticleList();
      
    },
    searchArticle() {
      if (!this.isSearching) {
        setTimeout(() => {
          this.$refs.searchInputRef.focus();
        }, 0);
        
        return (this.isSearching = true);
      }
      if (!this.keyword) {
        return (this.isSearching = false);
      }
      this.$articleApi
        .searchArticle({
          keyword: this.keyword,
        })
        .then((res) => {
          if (res.code === 200) {
            res.data.forEach((item) => {
              if (item.desc) {
                item.desc = item.desc.replace(/\n/g, "<br />");
              }
              item.tags = item.tags.split(",");
            });
            this.articleList = res.data;
            this.query.total = 0;
            this.isSearching = false;
          }
        });
    },
    getTags() {
      this.$articleApi.getTags().then((res) => {
        if (res.code === 200) {
          this.tagList = res.data;
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
    getCategory() {
      this.$articleApi.getCategory().then((res) => {
        if (res.code === 200) {
          this.categoryList = res.data;
        }
      });
    },
    changeCategory(tab, event) {
      console.log(this.query.category_id, tab.props.name);
      if (this.query.category_id === tab.props.name) {
        return;
      }
      this.query.category_id = tab.props.name;
      this.query.pageNum = 1;
      this.getArticleList();
    },
    changeYear(tab, event) {
      if (this.query.date === tab.props.name) {
        return;
      }
      this.query.date = tab.props.name;
      this.query.pageNum = 1;
      this.getArticleList();
    },
    chooseTag(id) {
      let index = this.query.tagList.findIndex((item) => {
        return item === id;
      });
      if (index !== -1) {
        return this.query.tagList.splice(index, 1);
      }
      this.query.tagList.push(id);
    },
    confirmTags(){
      this.query.pageNum = 1;
      this.getArticleList()
    }
  },
};
</script>

<style lang="scss" scoped>
.article {
  min-height: calc(100vh - 200px);
  padding-top: 30px;
  .tabs {
    width: 900px;
    margin: 0 auto 30px;
    :deep .el-tabs__item {
      font-size: 15px;
      padding: 0 15px;
    }
    :deep .is-top {
      &:nth-child(2) {
        padding-left: 0;
      }
      &:last-child {
        padding-right: 0;
      }
    }
    :deep .el-tabs__item.is-active {
      color: #0d0d0d;
      font-weight: bold;
    }
    :deep .el-tabs__active-bar {
      background-color: #43b885;
    }
    :deep .el-tabs__nav-wrap::after {
      background-color: lightgray;
    }
    :deep .el-tabs__item:hover {
      color: #43b885;
    }
    .tagList {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-top: 5px;
      .tagItem_active {
        border-color: #43b885 !important;
        color: #43b885 !important;
      }
      .tagItem {
        padding: 5px 10px;
        border: 2px solid #0d0d0d;
        border-radius: 8px;
        margin-right: 10px;
        margin-top: 10px;
        font-size: 13px;
        cursor: pointer;
        &:hover {
          border-color: #43b885;
          color: #43b885;
        }
      }
      .d-button {
        padding: 5px 20px;
        font-size: 13px;
        height: fit-content;
        margin-top: 10px;
        border-radius: 8px;
      }
    }
  }
  .articleList {
    width: 900px;
    margin: 0 auto;
    padding-bottom: 30px;
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
        .time{
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
  .noData {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666;
    font-size: 18px;
    font-weight: bold;
    padding-top: 100px;
  }
  .goToEdit {
    position: fixed;
    bottom: 200px;
    right: 100px;
    width: 50px;
    height: 50px;
    border-radius: 25px;
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
  .search {
    @extend .goToEdit;
    bottom: 270px;
    transition: all ease 0.5s;
    input {
      width: 70%;
      height: 100%;
    }
    .iconfont {
      font-size: 20px;
      position: absolute;
      right: 0;
      top: 0;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &:hover {
      .iconfont {
        transform: scale(1.1);
      }
    }
  }
  .searchActive {
    width: 200px;
    border-radius: 25px;
    background-color: white;
    color: #0d0d0d;
    box-shadow: 0px 2px 10px 1px rgba($color: #000000, $alpha: 0.1);
    justify-content: flex-start;
    input {
      width: 80%;
      height: 100%;
      padding-left: 20px;
    }
  }
}
</style>
