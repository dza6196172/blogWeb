<template>
  <div :class="{headerComp:true,headerCompTop:!isNotTop&&$route.name === 'home'}">
    <div class="headerNav" @mouseover="isMenu = true" @mouseleave="isMenu = false">
      <!-- <div class="right">
        <div class="block" @click="changeMenu">
          <div :class="{line1:true,line1_active:isMenu}"></div>
          <div :class="{line2:true,line2_active:isMenu}"></div>
          <div :class="{line3:true,line3_active:isMenu}"></div>
        </div>
      </div> -->
      <div class="right" @click="$router.back()" v-if="$route.name ==='articleDetail'||$route.name ==='edit'">
        <div class="block">
          <div class="iconfont icon-undo"></div>
        </div>
      </div>
      <div class="middle" :class="{isMenu:isMenu}">
        <div class="logo" :style="{color:!isNotTop&&$route.name === 'home'?'white':'#0d0d0d'}">小杜's Blog</div>
        <div class="navbar">
          <div :class="{navitem:true,isTopNavItem:!isNotTop&&$route.name === 'home'}" @click="$router.push('/')">首页</div>
          <div :class="{navitem:true,isTopNavItem:!isNotTop&&$route.name === 'home'}" @click="$router.push('/articleList')">文章</div>
          <div :class="{navitem:true,isTopNavItem:!isNotTop&&$route.name === 'home'}" @click="$router.push('/statistics')">统计</div>
          <div :class="{navitem:true,isTopNavItem:!isNotTop&&$route.name === 'home'}" @click="$router.push('/game')">小游戏</div>
          <div :class="{navitem:true,isTopNavItem:!isNotTop&&$route.name === 'home'}" @click="$router.push('/aboutMe')">关于本站</div>
        </div>
      </div>
      <div class="left" v-if="!Object.keys(userinfo).length">
        <div class="registerButton" title="注册" @click="$router.push('/register')">
          <div class="iconfont icon-add-account"></div>
        </div>
        <div class="loginButton" title="登录" @click="$router.push('/login')">
          <div class="iconfont icon-certified-supplier"></div>
        </div>
      </div>
      <div class="left" v-else>
        <div class="avatar" @click="$router.push('/user')">
          <img :src="userinfo.avatar?userinfo.avatar:require('@/assets/img/icon_avatar.png')" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {debounce} from '@/utils/tools'
export default {
  name: "headerComp",
  data() {
    return {
      isMenu:false,
    }
  },
  props:{
    isNotTop:{
      type:Boolean,
      default(){
        return false
      }
    }
  },  
  computed: {
    userinfo(){
      return this.$store.state.userInfo
    }
  },
  created() {
    if(localStorage.getItem('token')&&this.$route.name!=='user'){
      this.getUserInfo();
    }
  },
  methods: {
    changeMenu:debounce(function(){
      this.isMenu = !this.isMenu
    },300),
    getUserInfo(){
      this.$userApi.getUserInfo().then(res => {
        if(res.code === 200){
          this.$store.commit('setUserInfo',res.data)
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.headerCompTop{
  background-color: rgba($color: #0d0d0d, $alpha: 1.0)!important;
}
.headerComp {
  height: 100px;
  width: 100%;
  background-color: rgba($color: #f6f6f6, $alpha: 0.8);
  position: relative;
  z-index: 999;
  backdrop-filter: blur(15px);
  top: 0;
  transition: all ease 0.2s;
  .headerNav {
    min-width: 900px;
    max-width: 1360px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    overflow: hidden;
    .left{
      display: flex;
      align-items: center;
      position: absolute;
      right: 50px;
      top: 50%;
      transform: translateY(-50%);
      .loginButton{
        cursor: pointer;
        .iconfont{
          font-size: 28px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: darkgray;
          color: #f6f6f6;
          margin-right: 10px;
          font-weight: normal;
          display: flex;
          align-items: center;
          justify-content: center;
          &:hover{
            background-color: #e3e3e3;
          }
        }
      }
      .registerButton{
        @extend .loginButton;
        .iconfont{
          padding-left: 2px;
        }
      }
      .avatar{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid #1c1c1c;
        overflow: hidden;
        cursor: pointer;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .isMenu{
      top: -100px!important;
    }
    .middle {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      height: 200px;
      position: absolute;
      transition: all 0.2s ease-out;
      .logo {
        height: 100px;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        line-height: 100px;
      }
      .navbar{
        display: flex;
        height: 100px;
        .navitem{
          padding: 0 25px;
          cursor: pointer;
          font-weight: bold;
          font-size: 18px;
          height: 100px;
          min-width: 110px;
          line-height: 100px;
          text-align: center;
          transition: all 0.5s ease;
          &:hover{
            color: #f6f6f6!important;
            background-color: #202020;
          }
        }
        .isTopNavItem{
          color: white!important;
          font-weight: bold;
          &:hover{
            color: #0d0d0d!important;
            background-color: #f6f6f6;
          }
        }
      }
    }
    .right {
      .block{
        width: 30px;
        height: 30px;
        position: relative;
        cursor: pointer;
        .iconfont{
          font-size:32px;
          font-weight:bold;
        }
        .line1{
          position: absolute;
          width: 30px;
          height: 5px;
          border-radius: 2.5px;
          background-color: #202020;
          left: 0;
          top: 3px;
          transition:all 0.3s ease-out;
        }
        .line2{
          position: absolute;
          width: 30px;
          height: 5px;
          border-radius: 2.5px;
          background-color: #202020;
          left: 0;
          top: 13px;
          transition:all 0.3s ease-out;
        }
        .line3{
          position: absolute;
          width: 30px;
          height: 5px;
          border-radius: 2.5px;
          background-color: #202020;
          left: 0;
          top: 23px;
          transition:all 0.3s ease-out;
        }
        .line1_active{
          transform: rotate(135deg);
          top: 13px;
        }
        .line2_active{
          opacity: 0;
        }
        .line3_active{
          transform: rotate(-135deg);
          top: 13px;
        }
      }
    }
  }
}
</style>
