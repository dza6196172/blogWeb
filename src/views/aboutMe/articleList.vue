<template>
  <div>
    <div class="subTitle">文章列表</div>
    <p>路由地址：<span class="code">/articleList</span><br />您可以查看本站发布的文章内容，以前端相关技术为主。首页会展示最近更新的文章内容，若您想查看所有文章内容，请点击菜单内的‘文章’字样,之后会跳转至文章列表页面。</p>
    <img src="@/assets/img/aboutMe/menu.png" class="bigImg menu" alt="">
    <p>在文章列表页面您可以查看本站所有的文章内容，还可在顶部筛选栏内通过筛选条件来查询文章。文章列表按照文章发布时间顺序进行排序，最新发布的文章将排在前面。</p>
    <p>筛选栏分为三个板块：</p>
    <ul>
      <li>文章分类</li>
      <li>文章发表时间</li>
      <li>文章标签</li>
    </ul>
    <p>文章分类：每个文章都有一个独立的文章分类，如工作项目记录分类、个人项目记录分类等，分类名称会展示在文章列表每一项的标题前以便于区分。</p>
    <p>文章发表时间：以年份为单位进行筛选。</p>
    <p>文章标签：每一篇文章最多可以添加五个标签，标签提炼了文章的主要技术栈和技术方向。您在筛选标签时，可以多选标签，然后点击确认按钮来获取相关标签的文章。</p>
    <img src="@/assets/img/aboutMe/category.png" class="bigImg category" alt="">
    <div class="thirdTitle">
      搜索
    </div>
    <p>
      您可以在本页面搜索文章，点击右下角出现的搜索按钮<img src="@/assets/img/aboutMe/search.png"  class="search" alt="">，然后输入您想要搜索的内容，之后按回车或者再一次点击搜索按钮即可执行搜索操作。
    </p>
    <p>
      搜索的关键字将包括在文章标题、文章分类或者文章标签当中。
    </p>
  </div>
</template>

<script>
export default {
  name: "article-list",
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/aboutMe.scss";
.menu{
  height: 100px;
}
.category{
  height: 200px;
}
.search{
  height: 40px;
}
</style>
