<template>
  <div class="login">
    <div class="bg"></div>
    <div class="loginCard">
      <div class="whiteZone">
        <div class="title" @click="$router.push('/')">
          <div class="smallTitle">小杜's</div>
          <div class="bigTitle">Blog</div>
        </div>
        <div class="desc">Welcome to XiaoDu's Blog</div>
      </div>
      <div class="loginZone">
        <div class="loginTitle">登录 <span>LOGIN</span></div>
        <div class="email">
          <input
            type="text"
            placeholder="请输入邮箱 / please input your email"
            v-model="email"
          />
          <div class="iconfont icon-email"></div>
        </div>
        <div class="password">
          <input
            type="password"
            placeholder="请输入密码 / please input your password"
            v-model="password"
          />
          <div class="iconfont icon-password"></div>
        </div>
        <div class="buttonGroup">
          <d-button
            circleColor="#202020"
            content="登录 / login"
            class="registerButton"
            @click="login"
          ></d-button>
          <d-button
            circleColor="#202020"
            content="注册 / register"
            class="registerButton"
            @click="gotoRegister"
          ></d-button>
        </div>
        <div class="forgetPassword">
          忘记密码? / forget password?
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dButton from "@/components/d-button";
export default {
  name: "login",
  components:{
    dButton
  },
  data() {
    return {
      email:'',
      password:''
    }
  },
  methods: {
    login(){
      this.$userApi.login({
        email:this.email,
        password:this.password
      }).then(res => {
        if(res.code === 200){
          ElNotification({
            title: "success",
            message: res.msg,
            type: "success",
          });
          localStorage.setItem('token',res.token)
          this.$router.replace('/')
        }
      })
    },
    gotoRegister(){
      this.$router.push('/register')
    }
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-color: #f6f6f6;
  .bg {
    width: 40vw;
    background-color: #202020;
    height: 100%;
  }
  .loginCard {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 900px;
    height: 600px;
    background-color: #202020;
    box-shadow: 1px 1px 5px -2px black;
    overflow: hidden;
    display: flex;
    align-items: center;
    .whiteZone {
      width: calc(40vw - (100vw - 900px) / 2);
      height: 100%;
      background-color: #f6f6f6;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .title{
        cursor: pointer;
      }
      .smallTitle {
        color: #202020;
        font-size: 25px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .bigTitle {
        color: #202020;
        font-size: 48px;
        font-weight: bold;
      }
      .desc {
        font-size: 12px;
        color: #666;
        margin-top: 50px;
      }
    }
    .loginZone {
      padding: 80px;
      width: calc(900px - 40vw + (100vw - 900px) / 2);
      .loginTitle {
        color: #f6f6f6;
        font-size: 42px;
        font-weight: bold;
        span {
          font-size: 28px;
          color: lightgray;
        }
      }
      .email,
      .password {
        width: 100%;
        height: 50px;
        background-color: white;
        margin-top: 40px;
        position: relative;
        .iconfont {
          font-size: 28px;
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
        }
        input {
          width: 100%;
          height: 100%;
          padding-left: 55px;
          font-size: 15px;
        }
      }
      .buttonGroup {
        display: flex;
        justify-content: space-between;
        .loginButton,.registerButton {
          box-shadow: 1px 1px 5px -2px white;
          background-color: #f6f6f6;
          color: #202020;
          margin-top: 40px;
          width: 45%;
        }
      }
      .forgetPassword{
        color: lightgray;
        font-size: 13px;
        text-align: center;
        margin-top: 30px;
        cursor: pointer;
        transition: color 0.4s linear;
        &:hover{
          color: white;
        }
      }
    }
  }
}
</style>
