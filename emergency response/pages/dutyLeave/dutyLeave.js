// pages/dutyLeave/dutyLeave.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:2,
    show:'',
    startTime:'',
    endTime:'',
    date:'',
    show1:'',
    reason:'',
  },
  leave(){
    this.setData({ show1: true });
  },
  onClose() {
    this.setData({ show1: false });
  },
  checkDate(){
    let dateReg = /^(\d{4})-(\d{2})-(\d{2})$/;
    if(!dateReg.test(this.data.date)){
      Dialog.alert({
        message: '请输入正确日期格式',
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
  checkTime2(){
    let dateReg = /^ *(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})*$/;
    if(!dateReg.test(this.data.endTime)){
      Dialog.alert({
        message: '请输入正确日期格式',
      }).then(() => {
        // on close
      }
      );
    }
  },
  true(){
    var user = wx.getStorageSync('user');
    let data = {
      applicant:8,
      leaveDate:this.data.date,
      startTime:this.data.startTime,
      endTime:this.data.endTime,
      leaveMatter:this.data.reason,
    }
    request({
      url: '/weixin/leave/application',
      method: 'POST',
      data: data,
      headers: {//设置请求头
        'content-Type': 'application/json',
        token: wx.getStorageSync('token'),
        },
    }).then(res => {
      this.data.show=true;
      Dialog.alert({
        message: '提交成功',
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