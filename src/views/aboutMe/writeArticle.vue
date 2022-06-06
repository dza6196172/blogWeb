<template>
  <div>
    <div class="subTitle">
      写文章
    </div>
    <div class="note">
      注意：写文章功能可以使用，您可在网页中尝试该功能，但上传文章功能暂不对外开放。
    </div>
    <p>
      路由地址：<span class="code">/edit</span>
    </p>
    <p>在文章列表页面的右下角有写文章的图标按钮：<img src="@/assets/img/aboutMe/write.png"  class="write" alt="">，点击后即可进入写文章页面。</p>
    <p>
      写文章功能页面主体分为三个板块：
    </p>
    <ul>
      <li>快捷选项区</li>
      <li>主体内容区</li>
      <li>文章相关信息区</li>
    </ul>
    <div class="thirdTitle">
      快捷选项区
    </div>
    <p>
      本区域是快捷选项区域，点击该区域的模块，可以对文章进行快速排版或者添加富媒体等操作，本区域也是本页面核心功能区，用到了<a href="https://tiptap.dev/examples/default" target="_blank">第三方tiptap组件库</a>。关于本功能的开发详情可查看该篇文章：
    </p>
    <p>
      本区域又分成几类功能模块：
    </p>
    <ul>
      <li>段落区（paragraph）：<img src="@/assets/img/aboutMe/paragraph.png" class="paragraph"  alt="">H1,H2,H3,H4分别为四个等级的标题段落，最后一个为正文段落。</li>
      <li>文本区（text）：<img src="@/assets/img/aboutMe/text.png" class="text" alt="">从左向右对应功能分别为：加粗、倾斜文字、删除线、文本颜色、高亮文本、代码段以及链接。</li>
      <li>附加功能区（extra）：<img src="@/assets/img/aboutMe/extra.png" class="extra"  alt="">从左向右对应功能分别为：无序列表、有序列表、代码块、表格、添加图片。</li>
      <li>操作区（operate）：<img src="@/assets/img/aboutMe/operate.png" class="operate" alt="">功能为撤销和前进。</li>
    </ul>
    <p>
      其中，当您在主体内容区添加表格时，将会自动为您添加三行三列的表格。同时，当您的光标焦点在表格内容内部时，本页面左侧将会展示表格相关的功能操作区。<br />
      从上到下的功能依次对应为：添加列、删除列、添加行、删除行、合并或拆分表格、表格背景加深以及删除表格。
      <img src="@/assets/img/aboutMe/table.png" class="bigImg table" alt="">
    </p>
    <div class="thirdTitle">主体内容区</div>
    <p>
      主体内容区分为标题和正文，标题必填，字数需大于5字。正文内容必填，字符数需大于100字。
    </p>
    <div class="thirdTitle">文章相关信息区</div>
    <p>
      本区域分为四部分：上传封面，文章摘要、文章标签以及文章分类。
      <img src="@/assets/img/aboutMe/article_info.png" class="bigImg article_info" alt="">
      其中，上传封面部分，封面的比例为300x200。您可以选择任意尺寸的图片，本站提供图片裁剪的功能。关于图片裁剪相关功能的实现，可看该篇文章<a href="/articleDetail/13" target="_blank">本地获取图片并利用cropper.js裁剪图片</a>。
    </p>
    <img src="@/assets/img/aboutMe/cut.png" class="bigImg cut" alt="">
    <p>
      文章摘要为非必填内容，摘要将展示在文章列表中每篇文章的简介内。文章标签为必选项，最多可以选择五个标签，可以通过下方的标签列表快速添加标签，也可自定义标签内容。文章分类为必选项，只可以选择一个文章分类，同样，可以通过下方分类列表快速选择文章分类，也可自定义分类。<br/>
      当所有信息填写完毕后，点击发布博客，发布成功后页面会跳转至文章列表页面，刚刚发布的文章就可以展示在文章列表内。
    </p>
    <!-- <div class="thirdTitle">
      编辑文章
    </div>
    <p>
      当文章需要修改时，您可在文章详情页面点击右下角的编辑按钮进行编辑。
    </p> -->
  </div>
</template>

<script>
export default {
  name: "write-article",
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/aboutMe.scss';
.write,.paragraph,.text,.extra,.operate{
  height: 40px;
}
.table,.article_info{
  height: 500px;
}
.cut{
  height: 400px;
}
</style>
