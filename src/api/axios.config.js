import Axios from "axios";
import router from '../router'

const baseURL = process.env.VUE_APP_API_URL

const axiosInstance = Axios.create({
  timeout: 20000,
  baseURL: baseURL
});

let loading = null
let count = 0

axiosInstance.interceptors.request.use(
  config => {
    if(localStorage.getItem('token')){
      config.headers.Authorization = localStorage.getItem('token');
    }
    loading = ElLoading.service({
      lock: true,
      background: "rgba(255, 255, 255, 0.7)",
    })
    count++
    return config;
  },
  error => { }
);

axiosInstance.interceptors.response.use(
  response => {
    count--
    if(!count){
      loading.close();
    }
    let data = response.data;
    if(data.code === 500){
      return ElNotification({
        title: "error",
        message: data.msg,
        type: "error",
      });
    }
    if(data.code === 304){
      router.replace('/login')
      localStorage.removeItem('token')
      return ElNotification({
        title: "error",
        message: data.msg,
        type: "error",
      });
    }
    return data;
  },
  error => {
    count--
    if(!count){
      loading.close();
    }
    return ElNotification({
      title: "error",
      message: error,
      type: "error",
    });
  }
);
export default axiosInstance;
