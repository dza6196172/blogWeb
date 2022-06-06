import axios from "@/api/axios.config";

export const userApi = {
  register:function(data) {
    return axios({
      url: '/register',
      method: "post",
      data,
    });
  },
  getCode:function(data) {
    return axios({
      url: '/getCode',
      method: "post",
      data,
    });
  },
  login:function(data) {
    return axios({
      url: '/login',
      method: "post",
      data,
    });
  },
  getUserInfo:function(data) {
    return axios({
      url: '/getUserInfo',
      method: "get",
      data
    });
  },
  updateAvatar:function(data) {
    return axios({
      url: '/updateAvatar',
      method: "post",
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  updateInfo:function(data) {
    return axios({
      url: '/updateInfo',
      method: "post",
      data,
    });
  },
  postMessage:function(data) {
    return axios({
      url: '/postMessage',
      method: "post",
      data,
    });
  },
  getMessage:function(data) {
    return axios({
      url: '/getMessage',
      method: "get",
      params:data
    });
  },
}

export const articleApi = {
  uploadImage:function(data) {
    return axios({
      url: '/uploadImage',
      method: "post",
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  uploadCover:function(data) {
    return axios({
      url: '/uploadCover',
      method: "post",
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  uploadArticle:function(data) {
    return axios({
      url: '/uploadArticle',
      method: "post",
      data,
    });
  },
  updateArticle:function(data) {
    return axios({
      url: '/updateArticle',
      method: "post",
      data,
    });
  },
  getArticleList:function(data) {
    return axios({
      url: '/getArticleList',
      method: "get",
      params:data,
    });
  },
  searchArticle:function(data) {
    return axios({
      url: '/searchArticle',
      method: "get",
      params:data,
    });
  },
  getArticle:function(data) {
    return axios({
      url: '/getArticle',
      method: "get",
      params:data,
    });
  },
  sendComment:function(data) {
    return axios({
      url: '/sendComment',
      method: "post",
      data,
    });
  },
  getComment:function(data) {
    return axios({
      url: '/getComment',
      method: "get",
      params:data,
    });
  },
  getTags:function() {
    return axios({
      url: '/getTags',
      method: "get"
    });
  },
  addTags:function(data) {
    return axios({
      url: '/addTags',
      method: "post",
      data
    });
  },
  getCategory:function() {
    return axios({
      url: '/getCategory',
      method: "get"
    });
  },
  getYear:function() {
    return axios({
      url: '/getYear',
      method: "get"
    });
  },
  addCategory:function(data) {
    return axios({
      url: '/addCategory',
      method: "post",
      data
    });
  },
}

export const statisticApi = {
  getStatistic:function() {
    return axios({
      url: '/getStatistic',
      method: "get"
    });
  },
}
