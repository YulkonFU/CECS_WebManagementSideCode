// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:2,
    user:'',
  },



  onLoad(){
    var user = wx.getStorageSync('user');
    if(user.data.sex==0){
      user.data.sex = '未知'
    }
    if(user.data.sex==1){
      user.data.sex = '男'
    }
    else{
      user.data.sex = '女'
    }
    this.setData({user:user})
  },
  logout(){
    wx.removeStorageSync('user');
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