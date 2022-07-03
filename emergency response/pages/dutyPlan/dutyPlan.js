// pages/dutyPlan/dutyPlan.js
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:2,
    schedule:'',
  },

  onLoad(){
    var user = wx.getStorageSync('user');
    this.setData({user:user})
    request({
      url: '/dutySchedule/{id}',
      method: 'GET',
      data: {id:user.data.id}
    }).then(res => {
      console.log(res);
      this.setData({
        schedule:res.data
      })
      console.log(this.data.schedule);
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