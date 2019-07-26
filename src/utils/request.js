import axios from 'axios'
import { MessageBox, Message, Loading } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getToken } from '@/utils/auth'
let loadinginstace
// create an axios instance
const service = axios.create({
  // baseURL: 'http://192.168.43.127:8181', // url = base url + request url
  baseURL: '/api', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  loading: true,
  loadingText: 'loading...'
})

// request interceptor

service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    if(config.loading){
      loadinginstace = Loading.service({
        lock: true,
        text: config.loadingText,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, .7)'
      })
    }
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom status
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    if ( loadinginstace ) loadinginstace.close()
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 2000) {
      Message({
        message: res.message || 'error',
        type: 'error',
        duration: 2 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      //权限状态码待定
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //重新登录
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      if ( res.code === 401 || res.code === 9999){
        router.push({ path: '/404' })
      }
      return Promise.reject(res.message || 'error')
    } else {
      return response
    }
  },
  error => {
    if ( loadinginstace ) loadinginstace.close()
    if(error.response.status === 400) {
      switch (error.response.status){
        case 400:
          // 浏览器400处理
          break;
      }
    }

    Message({
      message: error.message,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  }
)

export default service