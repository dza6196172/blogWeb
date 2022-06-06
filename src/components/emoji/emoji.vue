<template>
  <div class="emoji">
    <div class="face">
      <div class="faceEmoji" @click="openEmoji">😃</div>
      <div class="emojiList" v-show="emojiShow" ref="emojiRef">
        <div class="emojiItem" v-for="(item, index) in emojiList" :key="index" @click="inputEmoji(item)">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "emoji",
  data() {
    return {
      emojiShow: false,
      emojiList: [
        "😃",
        "😄",
        "😁",
        "😆",
        "😅",
        "🤣",
        "😂",
        "🙂",
        "🙃",
        "😉",
        "🥰",
        "😍",
        "😘",
        "😗",
        "😚",
        "😋",
        "😜",
        "🤪",
        "🤑",
        "🤗",
        "🤭",
        "🤫",
        "🤐",
        "🤨",
        "😑",
        "😏",
        "😒",
        "🙄",
        "😬",
        "🤥",
        "😌",
        "😔",
        "😪",
        "🤤",
        "😴",
        "😷",
        "🤒",
        "🤕",
        "🤢",
        "🤮",
        "🤧",
        "🥵",
        "🥶",
        "🥴",
        "😵",
        "🤯",
        "🤠",
        "🥳",
        "😎",
        "🤓",
        "🧐",
        "😕",
        "😟",
        "😯",
        "😲",
        "😳",
        "😧",
        "😰",
        "😭",
        "😱",
        "😖",
        "😓",
        "😫",
        "🥱",
        "😤",
        "😡",
        "🤬",
        "😈",
      ],
    };
  },
  methods: {
    openEmoji() {
      this.emojiShow = true;
      this.$emit('focusTextarea')
    },
    inputEmoji(emoji){
      this.$emit('inputEmoji',emoji)
    }
  },
  mounted() {
    document.addEventListener("mouseup", (event) => {
      var emojiRef = this.$refs.emojiRef;
      if (emojiRef) {
        if (!emojiRef.contains(event.target)) {
          this.emojiShow = false;
        }
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.emoji{
  width: fit-content;
}
.face {
  position: relative;
  width: fit-content;
  .faceEmoji {
    width: 25px;
    height: 25px;
    font-size: 20px;
    cursor: pointer;
  }
  .emojiList {
    position: absolute;
    z-index: 999;
    width: 305px;
    height: 214px;
    background-color: white;
    border: 2px solid #0d0d0d;
    top: 30px;
    display: flex;
    flex-wrap: wrap;
    .emojiItem {
      background-color: white;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid lightgray;
      border-bottom: 1px solid lightgray;
      border-collapse: collapse;
      cursor: pointer;
      &:hover {
        background-color: rgba($color: lightgray, $alpha: 0.3);
      }
    }
  }
}
</style>
