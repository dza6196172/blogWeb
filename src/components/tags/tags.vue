<template>
  <div class="tagComp">
    <div class="tags">
      <div class="tagList">
        <div class="tagItem" v-for="(item, index) in tagList" :key="index">
          {{ item }}
          <div class="deleteTag" @click="deleteTag(index)">×</div>
        </div>
        <div
          class="addTag"
          @click="addTag"
          ref="addTagRef"
          v-show="tagList.length < limit"
        >
          添加{{ tagName }}
          <input
            type="text"
            class="tagInput"
            v-model="tagInput"
            v-show="tagInputShow"
            ref="tagInputRef"
            maxlength="40"
            @keyup.enter="ensureInputTag"
          />
        </div>
        <div class="note">
          最多选择{{limit}}个文章{{tagName}}
        </div>
      </div>
    </div>
    <div class="existList">
      <div
        class="existItem"
        v-for="(item, index) in existList"
        :key="index"
        @click="chooseTag(item)"
      >
        {{ item }}
        <div class="isChosen" v-show="isChosen(item)"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tags",
  props: {
    tagList: {
      type: Array,
      default() {
        return [];
      },
    },
    limit: {
      type: Number,
      default() {
        return 5;
      },
    },
    tagName: {
      type: String,
      default() {
        return "";
      },
    },
    listName: {
      type: String,
      default() {
        return "";
      },
    },
    existList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      tagInput: "",
      tagInputShow: false,
    };
  },
  mounted() {
    document.addEventListener("mouseup", (event) => {
      var addTagRef = this.$refs.addTagRef;
      if (addTagRef) {
        if (!addTagRef.contains(event.target)) {
          this.ensureInputTag();
        }
      }
    });
  },
  methods: {
    isChosen(item) {
      if (
        this.tagList.some((tag) => {
          return tag === item;
        })
      ) {
        return true;
      } else {
        return false;
      }
    },
    deleteTag(index) {
      this.$parent[this.listName].splice(index, 1);
    },
    ensureInputTag() {
      if (this.tagInput && this.tagList.length < this.limit) {
        if (
          !this.tagList.some((item) => {
            return item === this.tagInput;
          })
        ) {
          this.$parent[this.listName].push(this.tagInput);
        } else {
          ElNotification({
            title: "error",
            message: "已存在相同的标签！",
            type: "error",
          });
        }
        this.tagInput = "";
      }
      this.tagInputShow = false;
    },
    chooseTag(item) {
      this.tagInput = "";
      let tagIndex = this.tagList.findIndex((tag) => {
        return item === tag;
      });
      if (tagIndex < 0) {
        if (this.tagList.length < this.limit) {
          this.$parent[this.listName].push(item);
        }
      } else {
        this.deleteTag(tagIndex);
      }
    },
    addTag() {
      this.tagInputShow = true;
      setTimeout(() => {
        this.$refs.tagInputRef.focus();
      }, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.tagComp {
  width: 100%;
}
.tags {
  width: 100%;
  display: flex;
  align-items: center;
  .tagList {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .tagItem {
      cursor: default;
      height: 30px;
      border-radius: 8px;
      margin-bottom: 10px;
      background-color: lightgray;
      padding: 0 25px 0 10px;
      display: flex;
      align-items: center;
      font-size: 14px;
      margin-right: 10px;
      position: relative;
      .deleteTag {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        width: 15px;
        height: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        padding-bottom: 1px;
        cursor: pointer;
        color: #0d0d0d;
        &:hover {
          background-color: #0d0d0d;
          color: white;
        }
      }
    }
  }
  .addTag {
    cursor: pointer;
    border: 2px solid #0d0d0d;
    border-radius: 8px;
    width: 90px;
    height: 30px;
    font-size: 13px;
    font-weight: bold;
    color: #0d0d0d;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
    margin-bottom: 10px;
    .tagInput {
      position: absolute;
      left: -2px;
      top: -2px;
      width: 90px;
      height: 30px;
      border: 2px solid #0d0d0d;
      padding: 0 8px;
      border-radius: 8px;
      background-color: white;
    }
    &:hover {
      opacity: 0.7;
    }
    &::before {
      content: "+";
      position: absolute;
      left: 5px;
      top: 45%;
      transform: translateY(-50%);
      font-size: 20px;
    }
  }
  .note{
    font-size: 12px;
    margin-left: auto;
    color: gray;
    margin-top: 15px;
  }
}
.existList {
  border: 2px solid #0d0d0d;
  padding: 10px;
  padding-bottom: 0px;
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border-radius: 10px;
  background-color: lightgray;
  .existItem {
    margin-bottom: 10px;
    padding: 7px 15px;
    background-color: white;
    margin-right: 10px;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    position: relative;
    &:hover {
      background-color: #0d0d0d;
      color: white;
    }
    .isChosen {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      border-radius: 8px;
      border: 3px solid #0d0d0d;
    }
  }
}
</style>
