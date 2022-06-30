// pages/submitting/submitting.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:1,
    option1: [
      { text: '人为事故', value: 0 },
      { text: '自然灾害', value: 1 },
      { text: '恐怖袭击', value: 2 },
    ],
    value1:0,
    option2: [
      { text: '大', value: 'a' },
      { text: '中', value: 'b' },
      { text: '小', value: 'c' },
    ],
    value2:'c',
    show:'',
  },

  true1(){
    this.show=true;
    Dialog.alert({
      message: '上报成功',
      theme: 'round-button',
    }).then(() => {
      // on close
    }
    );
  },
  true2(){
    this.show=true;
    Dialog.alert({
      message: '响应升级成功',
      theme: 'round-button',
    }).then(() => {
      // on close
    }
    );
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