// pages/submitQuery/submitQuery.js
import { request } from '../../request/index'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:2,
    event:[],
  },
  onLoad(){
    var user = wx.getStorageSync('user');
    this.setData({user:user})
    request({
      url: '/weixin/event/list',
      method: 'GET',
      data: {userId:user.data.id},
      headers: {//设置请求头
        'content-Type': 'application/json',
        token: wx.getStorageSync('token'),
        },
    }).then(res => {
      console.log(res);
      this.setData({
        event:res.data.list
      })
      console.log(this.data.event);
    })
  },
  upgrade(e){
    const eventId = e.currentTarget.dataset['id'];
    console.log(eventId);
    request({
      url: '/weixin/event/escalation',
      method: 'GET',
      data: {eventId:eventId,status:2},
      headers: {//设置请求头
        'content-Type': 'application/json',
        token: wx.getStorageSync('token'),
        },
    }).then(res => {
      this.data.show=true;
      Dialog.alert({
        message: '响应升级',
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