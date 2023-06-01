import axios from 'axios'
import router from "../router";
import { reject } from "eslint-plugin-promise/rules/lib/promise-statics";
axios.defaults.timeout = 5000; //访问超时时间是5秒
axios.defaults.withCredentials = true //允许跨域
//Content-Type
//axios.defaults.headers.post['Context-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.post['Context-Type'] = 'application/form-data;charset=UFT-8'
// multipart/form-data
//后端接口基础地址设置
axios.defaults.baseURL = "http://localhost:8080";

//响应拦截器
axios.interceptors.response.use(
  response => {
    //如果response 里面的status 是200，说明访问到接口了，否则错误
    if (response.status == 200) {
      return Promise.resolve(response);
    } else {
      return Promise.resolve(response);
    }
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:           //未登录状态
          router.replace({
            path: '/',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
        case 404:           //没有该找到改账户
          break;
      }
      return Promise.reject(error.response);
    }
  }
);

/**
 * 封装 get 方法
 */
export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      })
  }
  )
}

/**
 * 封装post方法
 */
export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response, data);
      })
      .catch(err => {
        reject(err);
      })
  }
  )
}

/**
 * 封装put方法
 */
// export function put (url, data = {}) {
//   return new Promise((resolve, reject) => {
//     axios.put(url, data)
//       .then(response => {
//         resolve(response, data);
//       })
//       .catch(err => {
//         reject(err);
//       })
//   }
//   )
// }

export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

