<template>
  <div class="user">
    <div class="avatar">
      <img
        :src="
          userInfo.avatar
            ? userInfo.avatar
            : require('@/assets/img/icon_avatar.png')
        "
        alt=""
      />
      <div class="changeAvatar" v-if="userInfo.email">
        <d-button
          content="修改头像"
          @click="clickupdateAvatar"
          v-if="!isEditing"
        ></d-button>
        <d-button
          content="修改信息"
          @click="isEditing = true"
          v-if="!isEditing"
        ></d-button>
        <d-button
          content="确认修改"
          @click="updateInfo"
          v-if="isEditing"
        ></d-button>
        <d-button
          content="取消修改"
          @click="isEditing = false"
          v-if="isEditing"
        ></d-button>
        <d-button
          content="退出登录"
          @click="logout"
          v-if="!isEditing"
        ></d-button>
        <Cropper
          :file="cropperfile"
          :ratio="1"
          @cutImage="uploadCuttedAvatar"
        ></Cropper>
        <input
          type="file"
          accept="image/*"
          @change="updateAvatar($event)"
          name="avatar"
          v-show="false"
          ref="updateAvatar"
        />
      </div>
    </div>
    <div class="rightInfo">
      <div class="info">
        昵称：{{ userInfo.nickname }}
        <input
          type="text"
          class="nicknameInput"
          v-if="isEditing"
          v-model="newInfo.nickname"
          maxlength="8"
        />
      </div>
      <div class="info">邮箱：{{ userInfo.email }}</div>
      <div class="info">
        性别：{{
          userInfo.gender === 1 ? "男" : userInfo.gender === 0 ? "女" : ""
        }}
        <div class="genderGroup" v-if="isEditing">
          <input type="radio" v-model="newInfo.gender" value="1" class="" />男
          <input type="radio" v-model="newInfo.gender" value="0" class="" />女
        </div>
      </div>
      <div class="info">
        年龄：{{ userInfo.age }}
        <input
          v-if="isEditing"
          type="number"
          class="ageInput"
          v-model="newInfo.age"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      cropperfile: null,
      isEditing: false,
      userInfo: {},
      newInfo: {
        nickname: "",
        gender: [],
        age: null,
      },
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    clickupdateAvatar() {
      this.$refs.updateAvatar.click();
    },
    uploadCuttedAvatar(formdata) {
      this.$userApi.updateAvatar(formdata).then((res) => {
        if (res.code === 200) {
          this.getUserInfo();
          ElNotification({
            title: "success",
            message: res.msg,
            type: "success",
          });
        }
      });
    },
    logout() {
      localStorage.removeItem("token");
      this.$store.commit("setUserInfo", {});
      this.$router.replace("/");
    },
    getUserInfo() {
      this.$userApi.getUserInfo().then((res) => {
        if (res.code === 200) {
          this.userInfo = res.data;
          this.newInfo = JSON.parse(JSON.stringify(res.data));
          this.$store.commit("setUserInfo", res.data);
        } else if (res.code === 301) {
          ElNotification({
            title: "error",
            message: res.msg,
            type: "error",
          });
        }
      });
    },
    updateAvatar(event) {
      if (!event.target.files.length) {
        return;
      }
      let file = event.target.files[0];
      this.cropperfile = file;
      event.target.value = "";
    },
    updateInfo() {
      if (!this.newInfo.nickname || !this.newInfo.age) {
        return ElNotification({
          title: "error",
          message: "请填写完整信息！",
          type: "error",
        });
      }
      this.$userApi.updateInfo(this.newInfo).then((res) => {
        if (res.code === 200) {
          ElNotification({
            title: "success",
            message: res.msg,
            type: "success",
          });
        }
        this.isEditing = false;
        this.getUserInfo();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
  min-height: calc(100vh - 200px);
  display: flex;
  justify-content: center;
  align-items: center;
  .avatar {
    height: 175px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 120px;
      height: 120px;
      border: 3px solid #0d0d0d;
      border-radius: 10px;
      overflow: hidden;
      flex-shrink: 0;
    }
    .d-button {
      padding: 8px 20px;
      border-radius: 8px;
      margin-top: 10px;
    }
  }
  .rightInfo {
    margin-left: 40px;
    width: 300px;
    white-space: nowrap;
    .info {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
      position: relative;
      .nicknameInput {
        position: absolute;
        width: 200px;
        height: 40px;
        background-color: white;
        border: 2px solid #0d0d0d;
        border-radius: 10px;
        left: 70px;
        top: 50%;
        transform: translateY(-50%);
        padding: 0 10px;
        font-size: 16px;
      }
      .genderGroup {
        position: absolute;
        width: 200px;
        height: 40px;
        background-color: #e3e3e3;
        left: 70px;
        top: 50%;
        transform: translateY(-50%);
        padding: 0 10px;
        font-size: 16px;
        display: flex;
        align-items: center;
        input {
          width: 20px;
          height: 20px;
          background-color: white;
          border-radius: 50%;
          margin-right: 5px;
          cursor: pointer;
          &:last-of-type {
            margin-left: 20px;
          }
          &:checked {
            position: relative;
            border: 1px solid lightgray;
            &::after {
              content: "";
              position: absolute;
              width: 50%;
              height: 50%;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background-color: #0d0d0d;
              border-radius: 50%;
            }
          }
        }
      }
      .ageInput {
        position: absolute;
        width: 200px;
        height: 40px;
        background-color: white;
        border: 2px solid #0d0d0d;
        border-radius: 10px;
        left: 70px;
        top: 50%;
        transform: translateY(-50%);
        padding: 0 10px;
        font-size: 16px;
      }
    }
  }
}
</style>
