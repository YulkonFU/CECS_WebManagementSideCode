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
      username: this.data.username,
       password: this.data.password
      }
      // 发送请求给后台
      request({
        url: '/auth/user/login',
        method: 'POST',
        data: data,
        header: {
          'content-type': 'application/x-www-form-urlencoded'//修改为formdata
          },
      }).then(res => {
        // 获取用户信息
        if (res) {
          wx.showToast({
            title: '登录成功',
            icon: 'succcess'
          })
          console.log(res);
          let id = res.data.id;
          let token = res.data.token;
          wx.setStorageSync('token', token);
          wx.setStorageSync('token', token);
          request({
            url: '/weixin/user/personalInformation',
            method: 'GET',
            data: {userId:id}
          }).then(res => {
            console.log(res);
            wx.setStorageSync('user', res);
            // wx.setStorageSync('token', token)
          })
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
