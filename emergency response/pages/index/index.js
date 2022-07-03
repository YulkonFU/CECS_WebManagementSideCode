// index.js
// 获取应用实例
import { request } from '../../request/index'
const app = getApp()

Page({
  data: {
    event:[],
    active:0,
  },

  // onClick(event) {
  //   wx.showToast({
  //     title: `点击标签 ${event.id + 1}`,
  //     icon: 'none',
  //   });
  // },
  onLoad(){
      request({
        url: '/events/list',
        method: 'GET',
        data: {}
      }).then(res => {
        console.log(res);
        wx.setStorageSync('event', res);
        console.log(res.data);
        this.setData({
          event:(res.data.list ? res.data.list : null)
        })
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
  message(e){
    wx.redirectTo({
      url: '../message/message',
    })
    const data = e.currentTarget.dataset['content'];
    wx.setStorageSync('event_content',data);
  }

})
