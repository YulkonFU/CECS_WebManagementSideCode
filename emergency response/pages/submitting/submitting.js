// pages/submitting/submitting.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:1,
    option1: [
      { text: '火灾', value: 0 },
      { text: '爆炸', value: 1 },
      { text: '泄露', value: 2 },
      { text: '暴恐', value: 3 },
    ],
    value1:0,
    option2: [
      { text: '大', value: 2},
      { text: '中', value: 1 },
      { text: '小', value: 0 },
    ],
    value2:0,
    show:'',
    startTime:'',
    location:'',
    description:'',
  },
  true1(){
    var user = wx.getStorageSync('user');
    this.setData({user:user})
    let data = {
      reporter: user.data.id,
      type: this.data.value1,
      location: this.data.location,
      start_time: this.data.startTime,
      description: this.data.description,
      level:this.data.value2,
      status: 0,
    } ;
    console.log(data);
    request({
      url: '/event/new',
      method: 'POST',
      data: {data}
    }).then(res => {
      this.data.show=true;
      Dialog.alert({
        message: '上报成功',
        theme: 'round-button',
      }).then(() => {
        })
    });
  },
  true2(){
    var user = wx.getStorageSync('user');
    this.setData({user:user})
    let data = {
      reporter: user.data.id,
      type: this.data.value1,
      location: this.data.location,
      start_time: this.data.startTime,
      description: this.data.description,
      level:this.data.value2,
      status: 2,
    } ;
    console.log(data);
    request({
      url: '/event/new',
      method: 'POST',
      data: {data}
    }).then(res => {
      this.data.show=true;
      Dialog.alert({
        message: '响应升级',
        theme: 'round-button',
      }).then(() => {
        })
    });
  },
  check1(){
    if(this.data.location==null){
      Dialog.alert({
        message: '请输入信息',
      }).then(() => {
        // on close
      }
      );
    }
  },
  check2(){
    if(this.data.description==null){
      Dialog.alert({
        message: '请输入信息',
      }).then(() => {
        // on close
      }
      );
    }
  },
  checkTime1(){
    let dateReg = /^ *(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})*$/;
    if(!dateReg.test(this.data.startTime)){
      Dialog.alert({
        message: '请输入正确日期格式',
      }).then(() => {
        // on close
      }
      );
    }
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