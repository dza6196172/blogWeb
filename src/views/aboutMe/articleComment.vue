<template>
  <div>
    <div class="subTitle">文章/评论</div>
    <p>路由地址：<span class="code">/articleDetail/:id</span></p>
    <p>在文章列表中点击任意一篇文章即可跳转至文章详情页面。</p>
    <p>在文章详情页面中，将在头部展示文章分类、文章标题、浏览量、评论数、发布时间以及标签。您可点击评论图标滚动至评论区进行评论。</p>
    <img src="@/assets/img/aboutMe/article.png" class="bigImg article" alt="">
    <div class="thirdTitle">评论</div>
    <p>点击输入框即可开始评论，限制字数为300字。您还可以点击评论框右下角的表情图标来输入emoji表情，一个emoji表情占两个字符。</p>
    <img src="@/assets/img/aboutMe/comment.png" class="bigImg comment" alt="">
    <p>若您未注册本站会员，您的评论昵称将展示位‘可爱的网友’，头像为默认头像，若您注册过会员，但未修改昵称，则将展示您的邮箱地址，同样，若您未上传头像，则仍旧使用默认头像，否则将展示您上传过的头像。</p>
  </div>
</template>

<script>
export default {
  name: "article-comment",
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/aboutMe.scss";
.article{
  height: 130px;
}
.comment{
  height: 180px;
}
</style>
