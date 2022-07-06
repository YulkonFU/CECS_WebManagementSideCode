// pages/clockIn/clockIn.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import { request } from '../../request/index'
var util = require('../../utils/util.js');

Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    active:2,
    show:'',
    location:'',
    schedule:[],
    message:'',
  },
  onLoad: function () {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    var user = wx.getStorageSync('user');
    this.setData({user:user})
    this.setData({
      time: time
    });
    request({
      url: '/weixin/dutySchedule/currentSchedule',
      method: 'GET',
      data: {id:user.data.id}
    }).then(res => {
      console.log(res);
      this.setData({
        schedule:res.data
      })
      console.log(this.data.schedule.dutyPlace);
    })
  },
  true(){
    this.show=true;
    var user = wx.getStorageSync('user');
    this.setData({user:user})
    let data = {
      userId:user.data.id,
      name:user.data.name,
      registrationTime:this.data.time, 
      dutyPlace:this.data.dutyPlace,
      result:this.data.message,
    }
    request({
      url: '/weixin/dutyLog/registration',
      method: 'POST',
      data: data,
      headers: {//设置请求头
        'content-Type': 'application/json',
        token: wx.getStorageSync('token'),
        },
    }).then(res => {
      this.data.show=true;
      Dialog.alert({
        message: '上报成功',
        theme: 'round-button',
      }).then(() => {
        })
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
  },
})