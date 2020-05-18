//封装axios   npm i axios

import axios from 'axios';
import { Toast } from 'vant';

function wait(msg) {
    Toast.clear();
    Toast.loading({
        message: msg,
        forbidClick: true,    //禁止背景点击
        loadingType: "spinner",  //加载图标类型
        duration: 10000
    })
}

function success(msg) {
    Toast.clear();
    Toast.success({
        message: msg,
        duration: 600,
    })
}

function fail(msg) {
    Toast.clear();
    Toast.success({
        message: msg,
        duration: 600,
    })
}

// Add a request interceptor   添加请求的拦截器 发送之前要做业务逻辑
axios.interceptors.request.use(function (config) {
    // Do something before request is sent   请求发送之前
    wait()
    return config;
}, function (error) {
    // Do something with request error    请求发送失败
    fail('请求发送失败')
    return Promise.reject(error);
});

// Add a response interceptor   添加响应的拦截器 服务器响应数据到客户端之前
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data   响应成功业务逻辑
    setTimeout(() => {
        if (response.data.error && response.data.error != 0) {
            fail(response.data.msg || '请求失败')
        } else {
            success(response.data.msg || '请求成功')
        }
    }, 300)

    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error   响应失败的业务逻辑
    fail('响应失败')
    return Promise.reject(error);
});



export { axios }