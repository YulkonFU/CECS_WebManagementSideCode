// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:2
  },



  logout(){
    wx.redirectTo({
      url: '../login/login',
    })
  },
  clockIn(){
    wx.redirectTo({
      url: '../clockIn/clockIn',
    })
  },
  dutyPlan(){
    wx.redirectTo({
      url: '../dutyPlan/dutyPlan',
    })
  },
  leave(){
    wx.redirectTo({
      url: '../dutyLeave/dutyLeave',
    })
  },
  query(){
    wx.redirectTo({
      url: '../submitQuery/submitQuery',
    })
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
      url: '../submitting/submitting',
    })
  },
  friend(){
    wx.redirectTo({
      url: '../user/user',
    })
  }
})