// pages/dutyLeave/dutyLeave.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:2,
    show:''
  },

  true(){
    this.show=true;
    Dialog.alert({
      message: '请假成功',
      theme: 'round-button',
    }).then(() => {
      // on close
    }
    );
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