import axios from 'axios'

// 创建一个axios对象
const instance = axios.create({
    timeout: 5000
})

// 请求拦截
// 所有的网络请求都会先走这个方法
// 添加请求拦截器,所有的网络请求都会先走这个方法，我们可以在它里面为请求添加一些自定义的内容
instance.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    console.group('全局请求拦截')
    console.log(config)
    console.groupEnd()
        //设置请求头信息
    console.log(localStorage.getItem('token'));
    config.headers.token = localStorage.getItem('token') || ''
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
// 此处可以根据服务器的返回状态码做响应的处理
// 404 404 500
instance.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    console.group('全局响应拦截')
    console.log(response)
    console.groupEnd()
    return response;
}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export function get(url, params) {
    return instance.get(url, {
        params
    })
}

export function post(url, data) {
    return instance.post(url, data)
}

export function del(url) {
    return instance.delete(url)
}

export function put(url, data) {
    return instance.put(url, data)
}