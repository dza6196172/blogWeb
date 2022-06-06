<template>
  <div>
    <div class="subTitle">统计</div>
    <p>路由地址：<span class="code">/statistics</span></p>
    <p>统计页面可在菜单栏的统计选项中进入，该页面的设计目的是为了让网站的相关数据可视化，对网站的流量进行把控与统计以及更好地维护网站。</p>
    <p>统计页面分为四个部分：</p>
    <ul>
      <li>浏览量统计</li>
      <li>总数统计</li>
      <li>文章访问量排行</li>
      <li>文章提交日历</li>
    </ul>
    <img src="@/assets/img/aboutMe/statistics.png" class="bigImg statistics" alt="">
    <p>
      浏览量统计板块使用了echarts的折线图，展示了最近七天的文章浏览量数据变化曲线，鼠标移至曲线上可以查看详细的浏览量数值。<br/>
      总统计数分别记录了四个值：所有文章的总访问量、所有文章的总评论数、发表的文章数以及注册的用户数。<br />
      文章访问量排行展示了全站访问量排行前六的文章列表，百分比的值表示该文章的访问量占所有网站文章访问量的百分比，您可以点击任一文章来查看其详细内容。<br />
      文章提交日历展示了近140+天的文章提交数量，您可以用鼠标移至任一方格上来显示改天的文章提交量，右上角显示的是文章提交量的背景颜色变化图，从左往右的文章提交量分别为0，1，2，3，4+。
    </p>
  </div>
</template>

<script>
export default {
  name: "statistics",
}
</script>


<style lang="scss" scoped>
@import "@/assets/css/aboutMe.scss";
.statistics{
  height: 500px;
}
</style>
