<template>
  <div>
    <div class="subTitle">登录/注册</div>
        <p>
          小杜的博客提供了注册账号的功能。
        </p>
        <p>首先，您如果未在本站进行注册以及登录操作，您仍旧可以访问本站大部分网页。登录后，您可以在用户信息页面修改您的信息，并会在评论区展示您的昵称以及头像。若您未设置昵称，则会默认展示您的邮箱。详情看<a @click="gotoComment">文章/评论</a>。</p>

        <div class="thirdTitle">
          注册
        </div>
        <p>
          路由地址：<span class="code">/register</span><br/>
          您可以通过网页右上角的注册按钮来跳转到注册页面：<img src="@/assets/img/aboutMe/register.png" alt="" class="register"><br/>
          进入注册页后，填写您的邮箱地址，并获取邮箱验证码（当前发送验证码邮箱为本人个人邮箱，发送次数过多可能导致邮件转入回收站，若您没有收到邮件，请在回收站内查看），填写好密码和验证码之后，并收到右上角‘注册成功’的提示框，即可注册成功。注册成功后会跳转至登录页，您可使用刚刚注册好的帐号进行登录。
          <br/>
          <img src="@/assets/img/aboutMe/registerPage.png" alt="" class="bigImg registerPage">
        </p>
        <div class="thirdTitle">
          登录
        </div>
        <p>
          路由地址：<span class="code">/login</span><br/>
          您可以通过网页右上角的登录按钮来跳转到登录页面：<img src="@/assets/img/aboutMe/login.png" alt="" class="login"><br/>
          进入登录页后，填写您的邮箱地址以及密码即可登录。若您没有帐号，请先注册。登录成功后会跳转至首页。
          <br/>
          <img src="@/assets/img/aboutMe/loginPage.png" alt="" class="bigImg loginPage">
        </p>
  </div>
</template>

<script>
export default {
  name: "login-register",
  methods: {
    gotoComment(){
      this.$parent.jumpTo('articleComment')
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/aboutMe.scss';
.register{
  height: 40px;
}
.registerPage{
  height: 400px;
}
.login{
  height: 40px;
}
.loginPage{
  height: 400px;
}
</style>
