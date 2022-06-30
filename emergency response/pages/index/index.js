// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    event:[],
    active:0
  },

  onClick(event) {
    wx.showToast({
      title: `点击标签 ${event.detail + 1}`,
      icon: 'none',
    });
  },
  // onLoad:function(e){
  //     request({
  //       url: '/after/admin/login',
  //       method: 'GET',
  //       data: {}
  //     }).then(res => {
  //       wx.setStorageSync('event', res)
  //     })
  // },
  
  
  chat(){
    wx.redirectTo({
      url: '../index/index',
    })
  },
  description(){
    wx.redirectTo({
      url: '../submitting/submitting',
    })
  },
  friend(){
    wx.redirectTo({
      url: '../user/user',
    })
  },
  message(){
    wx.redirectTo({
      url: '../message/message',
    })
  }

})
