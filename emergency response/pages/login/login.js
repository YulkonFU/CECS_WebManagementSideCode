// pages/login/login.js
import { request } from '../../request/index'
Page({
  data: {
    username: '',
    password: ''
  },
  login() {
    // 先构建请求的json
    let data = {
      account: this.data.username,
       password: this.data.password
      }
      // 发送请求给后台
      request({
        url: '/after/admin/login',
        method: 'POST',
        data: data
      }).then(res => {
        // 接下来，问题就变得非常简单了
        if (res) {
          wx.showToast({
            title: '登录成功',
            icon: 'succcess'
          })
          wx.setStorageSync('user', res)
          setTimeout(() => {
            wx.navigateTo({
              url: '../index/index',
            })
          }, 1000)         
        } else {
          wx.showToast({
            title: '账号或密码错误',
            icon: 'error'
          })
        }
      })
  }
})
