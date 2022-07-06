// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    content:'1、启动警报广播通知园区公众 2、根据是否响应升级作出后续指挥调度',
  },
  onLoad(){
    
    var that = this;
    wx.getStorage({
      key: 'event_content',
      success(res){
        that.setData({
          // content: res.data,
        })
      }
    })
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