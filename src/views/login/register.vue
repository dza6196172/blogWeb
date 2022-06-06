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
        <div class="loginTitle">注册 <span>SIGN UP</span></div>
        <div class="email">
          <input type="text" placeholder="请输入邮箱" v-model="email" />
          <d-button
            circleColor="#202020"
            @click="getCode"
            :disabled="countSecond !== 60"
            :content="countSecond === 60?'获取验证码':countSecond+'s'"
            class="getCode"
          ></d-button>
          <div class="iconfont icon-email"></div>
        </div>
        <div class="password">
          <input type="password" placeholder="请输入密码" v-model="password" />
          <div class="iconfont icon-password"></div>
        </div>
        <div class="buttonGroup">
          <div class="code">
            <input type="text" placeholder="请输入验证码" v-model="code" />
            <div class="iconfont icon-assessed-badge"></div>
          </div>
          <d-button
            circleColor="#202020"
            content="注册 / register"
            class="registerButton"
            @click="register"
          ></d-button>
          <!-- <el-button type="primary" plain>Primary</el-button> -->
        </div>
        <div class="gotoLogin" @click="$router.push('/login')">
          去登录
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AES from "@/utils/aes.js";
import dButton from "@/components/d-button";
import {debounce} from '@/utils/tools.js'
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      code: "",
      countTimeOut:null,
      countSecond: 60,
    };
  },
  components: {
    dButton,
  },
  methods: {
    getCode:debounce(function(){
      this.$userApi
        .getCode({
          email: this.email
        })
        .then((res) => {
          if(res.code === 200){
            ElNotification({
              title: "success",
              message: res.msg,
              type: "success",
            });
            this.countTimeOut = setInterval(() => {
              this.countSecond --
              if(this.countSecond === 0){
                clearInterval(this.countTimeOut)
                this.countSecond = 60
              }
            }, 1000);
          }
        });
    }),
    register:debounce(function(){
      this.$userApi
        .register({
          email: this.email,
          password:this.password,
          code:this.code
        })
        .then((res) => {
          if(res.code === 200){
            ElNotification({
              title: "success",
              message: res.msg,
              type: "success",
            });
            this.$router.replace('/login')
          }
        });
    }),
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
        display: flex;
        .iconfont {
          font-size: 28px;
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
        }
        .getCode {
          width: 200px;
          box-shadow: 1px 1px 5px -2px white;
          background-color: #f6f6f6;
          color: #202020;
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
        .code {
          width: 45%;
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
        .registerButton {
          box-shadow: 1px 1px 5px -2px white;
          background-color: #f6f6f6;
          color: #202020;
          margin-top: 40px;
          width: 45%;
        }
      }
      .gotoLogin {
        color: lightgray;
        font-size: 13px;
        text-align: right;
        margin-top: 20px;
        cursor: pointer;
        transition: color 0.4s linear;
        &:hover {
          color: white;
        }
      }
    }
  }
}
</style>
