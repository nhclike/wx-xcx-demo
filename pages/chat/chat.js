
var app = getApp();
var websocket = require('../../utils/websocket.js');
var utils = require('../../utils/util.js');

Page({
  /**
     * 页面的初始数据
     */
  data: {
    newslist: [],   //发送的消息列表
    userInfo: {},
    scrollTop: 0,
    increase: false,//图片添加区域隐藏
    aniStyle: true,//动画效果
    message: "",
    previewImgList: [],
    focus:true   //控制消息发送框自动聚焦
  },
  onLoad: function (options) {
    //console.log(app.globalData.userInfo);
    var that = this

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
    //调通接口
    websocket.connect(this.data.userInfo, function (res) {
       console.log(JSON.parse(res.data))
      var list = []
      list = that.data.newslist
      list.push(JSON.parse(res.data))
      that.setData({
        newslist: list
      })
      var len = that.data.newslist.length;
      that.setData({
        scrollTop: 130 * len
      })
    })
  },
  // 页面卸载
  onUnload() {
    wx.closeSocket();
    wx.showToast({
      title: '连接已断开~',
      icon: "none",
      duration: 2000
    })
  },
  //事件处理函数，发送消息
  send: function () {
    if (this.data.message.trim() == "") {
      wx.showToast({
        title: '消息不能为空哦~',
        icon: "none",
        duration: 2000
      })
      return false;
    }
    websocket.send(
      { 
        "content":  this.data.message , 
        "date":utils.formatTime(new Date()) ,
        "type":"text",
        "nickName": this.data.userInfo.nickName, 
        "avatarUrl":  this.data.userInfo.avatarUrl  
      }
    )
    this.setData({
      focus:true,
    })
    
  },
  //监听input值的改变
  bindChange(res) {
    this.setData({
      message: res.detail.value
    })
  },
  cleanInput() {
    //button会自动清空，所以不能再次清空而是应该给他设置目前的input值
    this.setData({
      message: this.data.message
    })
  },
  increase() {
    this.setData({
      increase: true,
      aniStyle: true
    })
  },
  //点击空白隐藏message下选框
  outbtn() {
    this.setData({
      increase: false,
      aniStyle: true
    })
  },
})