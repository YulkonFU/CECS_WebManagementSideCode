// pages/submit/submit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:1
  },

  onClick(event) {
    wx.showToast({
      title: `点击标签 ${event.detail + 1}`,
      icon: 'none',
    });
  },
  chat(){
    wx.redirectTo({
      url: '../index/index',
    })
  },
  description(){
    wx.redirectTo({
      url: '../submit/submit',
    })
  },
  friend(){
    wx.redirectTo({
      url: '../user/user',
    })
  }
})