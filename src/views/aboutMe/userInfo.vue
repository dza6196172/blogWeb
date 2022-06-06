<template>
  <div>
    <div class="subTitle">
      个人中心
    </div>
    <p>
      路由地址：<span class="code">/user</span>
    </p>
    <p>
      若您拥有本站的账户并且已经登录，您将在本站右上角看到您的个人头像，点进去即可进入到个人中心页面。
    </p>
    <p>
      您可以在个人中心页面修改您的个人信息，其中包括：
    </p>
    <ul>
      <li>头像</li>
      <li>昵称</li>
      <li>性别</li>
      <li>年龄</li>
    </ul>
    <p>
      头像修改限制的图片为静态图，同时限制图片比例为1:1。但您可以上传任意比例的图片，本站提供头像裁剪的功能。
    </p>
    <img src="@/assets/img/aboutMe/cutHead.png" class="bigImg cutHead" alt="">
    <p>
      您可以点击修改信息按钮来修改您的个人信息，其中昵称修改限制8个字符。修改后的信息将会显示在评论区或者是留言板内。
    </p>
  </div>
</template>

<script>
export default {
  name: "user-info",
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/aboutMe.scss";
.cutHead{
  height: 400px;
}
</style>
