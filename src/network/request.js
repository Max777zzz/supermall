import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/z8',
    timeout: 5000
  })
  // 请求拦截
  instance.interceptors.request.use(
    config => {
      return config
    },
    err => {
      return err
    }
  );
  // 响应拦截
  instance.interceptors.response.use(
    res => {
      // console.log(res);
      return res.data
    },
    err => {
      console.log(err);
    }
  );

  // 发送真正的网络请求
  return instance(config);
}