// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
  },

  
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
})