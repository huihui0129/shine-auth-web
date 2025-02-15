import axios from 'axios';
import {ElMessage} from "element-plus";
import router from "@/router";

const request = axios.create({
  baseURL: 'http://localhost:9000',  // 注意！！ 这里是全局统一加上了 后端接口前缀 前缀，后端必须进行跨域配置！
  timeout: 5000
})
axios.defaults.withCredentials = false //携带cookie
// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
  // if (config.headers.loginType) {
  // 	config.headers['Content-Type'] = 'multipart/form-data; boundary=<calculated when request is sent>';
  // 	config.headers['Authorization'] = "Basic d2ViOndlYi1zZWNyZXQ=";
  // } else {
  	let accessToken = localStorage.getItem("token") || undefined;
  	if (accessToken) {
      config.headers['Content-Type'] = 'application/json;charset=UTF-8';
      config.headers['Authorization'] = "Bearer " + accessToken;  // 设置请求头
    }
  // }
  // config.headers['token'] = user.token;  // 设置请求头
  // if (request.getUri() !== '/' && request.getUri() !== '/login' ) {
  //     if (localStorage.getItem("token")) {
  //         console.log("工具类添加了token");
  //         config.headers['token'] = localStorage.getItem("token");
  //     }
  // }
  return config
}, error => {
  return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
  response => {
    let res = response.data;
    if (res.code !== "000000") {
      ElMessage.error(res.message);
    }
    // 如果是返回的文件
    if (response.config.responseType === 'blob') {
      return res
    }
    // 兼容服务端返回的字符串数据
    if (typeof res === 'string') {
      res = res ? JSON.parse(res) : res
    }
    return res;
  },
  error => {
    console.log("错误：" + error) // for debug
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        ElMessage.error(data.message);
        router.push("/login");
      }
    }
    return Promise.reject({ error: true, message: error.message, data: error.response })
  }
)


export default request;

