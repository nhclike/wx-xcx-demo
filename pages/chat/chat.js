
var app = getApp();
var websocket = require('../../utils/websocket.js');
var utils = require('../../utils/util.js');
var upload_url = '请填写您的图片上传接口地址'
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

    if (app.globalData.userInfo == null) {
      wx.getUserInfo({
        success(res) {
          app.globalData.userInfo = res.userInfo
        }
      })
    }
    else {
      console.log(app.globalData.userInfo);
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
    //调通接口
    websocket.connect(this.data.userInfo, function (res) {
      let data = JSON.parse(res.data);
      console.log(data)
      var list =that.data.newslist;
      list.push(data);
      that.setData({
        newslist: list
      });
      console.log(that.data.newslist);
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
        content:  this.data.message , 
        date:utils.formatTime(new Date()) ,
        type:"text",
        nickName: this.data.userInfo.nickName, 
        avatarUrl:  this.data.userInfo.avatarUrl  
      }
    )
    this.setData({
      focus:true,
    })
    
  },
  //监听input值的改变
  bindChange(res) {
    console.log(res);
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
  chooseImage() {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.uploadFile({
          url: upload_url, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          headers: {
            'Content-Type': 'form-data'
          },
          success: function (res) {
            if (res.data) {
              that.setData({
                increase: false
              })
              websocket.send('{"images":"' + res.data + '","date":"' + utils.formatTime(new Date()) + '","type":"image","nickName":"' + that.data.userInfo.nickName + '","avatarUrl":"' + that.data.userInfo.avatarUrl + '"}')
              that.bottom()
            }
          }
        })

      }
    })
  },
  //图片预览
  previewImg(e) {
    var that = this
    //必须给对应的wxml的image标签设置data-set=“图片路径”，否则接收不到
    var res = e.target.dataset.src
    var list = this.data.previewImgList //页面的图片集合数组

    //判断res在数组中是否存在，不存在则push到数组中, -1表示res不存在
    if (list.indexOf(res) == -1) {
      this.data.previewImgList.push(res)
    }
    wx.previewImage({
      current: res, // 当前显示图片的http链接
      urls: that.data.previewImgList // 需要预览的图片http链接列表
    })
  }
})