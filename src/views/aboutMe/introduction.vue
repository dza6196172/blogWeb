<template>
  <div class="introduction content">
    <div class="title">简介</div>
    <p>
      欢迎来到小杜的博客！<br />
      本网站的开发目的是为了记录本人日常工作或者生活中遇到的开发问题，以及记录本人的学习心得或者一些个人项目的开发过程，同时可以和同行一起探讨问题，不断提升和丰富自己的开发水平。<br />
      若您对本网站有任何建议或者发现本网站的bug，欢迎您给我留言，在首页留言板处留言即可。
    </p>
    <p>
      本页面主要对本博客网站（以下统称为小杜的博客）的相关功能进行介绍，并记录网站的开发过程以及心得体会。
    </p>
    <p>
      小杜的博客采用前后端分离模式进行开发，前端使用vue框架，后端使用node.js+express+mysql。<br />
      其中，<b>前端</b>涉及的技术栈以及相关第三方组件有：
    </p>
    <ul>
      <li>Vue.js</li>
      <li>Vuex</li>
      <li>axios</li>
      <li>Sass</li>
      <li>element-plus（element组件库）</li>
      <li>tiptap（富文本编辑器）</li>
      <li>cropper.js（图片裁剪）</li>
      <li>echarts（图表）</li>
    </ul>
    <p><b>后端</b>涉及的技术栈以及第三方中间件主要有：</p>
    <ul>
      <li>node.js</li>
      <li>express（web开发框架）</li>
      <li>cors（跨域处理中间件）</li>
      <li>express-jwt+jsonwebtoken（token处理中间件）</li>
      <li>multer（form-data表单数据处理中间件）</li>
      <li>bcrypt.js（密码加密）</li>
      <li>mysql数据库</li>
    </ul>

    <p>
      本站地址：<a href="http://www.dzablog.com" target="_blank"
        >http://www.dzablog.com</a
      ><br />
      本人之前的博客记录在CSDN当中，其中有部分文章未收录在本网站中，您可在CSDN中查看其它我早期的博客内容：<a
        href="https://blog.csdn.net/iufesjgc"
        target="_blank"
        >https://blog.csdn.net/iufesjgc</a
      >
    </p>

    <p style="font-size: 12px; color: gray">
      注：本页面您将看到大篇幅凑字数以及可视为废话的介绍文字，目的是为了丰富功能贫瘠的网站内容以及提升逼格，因此请酌情观看！
    </p>
  </div>
</template>

<script>
export default {
  name: "introduction",
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/aboutMe.scss';
</style>
