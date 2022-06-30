// pages/clockIn/clockIn.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
var util = require('../../utils/util.js');

Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    active:2,
    show:'',
    
  },
  true(){
    this.show=true;
    Dialog.alert({
      message: '打卡成功',
      theme: 'round-button',
    }).then(() => {
      // on close
    });
  },
  
  onLoad: function () {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time
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