"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ctx = '';
exports.default = Page({
  data: {
    img: "../../image/n4.png",
    pen: 3, //画笔粗细默认值
    color: "#cc0033", //画笔颜色默认值
    startX: 0, //保存X坐标轴变量
    startY: 0 //保存X坐标轴变量
  }, 
  //手指触摸动作开始

  onReady: function onReady(e) {
    ctx = wx.createContext();
    ctx.drawImage(this.data.img, 0, 0, 686, 686);
    //ctx.stroke();
    //ctx.draw();

    wx.drawCanvas({
      canvasId: "myCanvas",
      reserve: true,
      actions: ctx.getActions() // 获取绘图动作数组
    });
  },

  drawAfter: function drawAfter() {
    wx.canvasToTempFilePath({
      width: 686,
      height: 686,
      canvasId: "myCanvas",
      success: function success(res) {
        var tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        //把图片保存到相册
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath
        });
        //把图片保存到相册
        //进行文件的拷贝
        //上传
        // wx.uploadFile({
        //   url: "http://192.168.0.101:8080/Teacher/copyfile.action",
        //   filePath: tempFilePath,
        //   name: "file",
        //   header: { "Content-Type": "multipart/form-data" },
        //   //成功
        //   success: function success(res) {
        //     console.log(res);
        //     if (res.statusCode != 200) {
        //       wx.showModal({
        //         title: "提示",
        //         content: "上传失败",
        //         showCancel: false
        //       });
        //       return;
        //     }
        //     var data = res.data;
        //     console.log("田江南你好刷币:" + data);
        //   },
        //   //成功
        //   fail: function fail(e) {
        //     console.log(e);
        //     wx.showModal({
        //       title: "提示",
        //       content: "上传失败",
        //       showCancel: false
        //     });
        //   }
        // });
        //进行文件的拷贝
      }
    });
  },
  saveimg: function saveimg() {
    var _this = this;

    //ctx.draw();
    setTimeout(function () {
      _this.drawAfter();
    }, 500);
  },
  touchStart: function touchStart(e) {
    //得到触摸点的坐标
    this.data.startX = e.changedTouches[0].x;
    this.data.startY = e.changedTouches[0].y;
    ctx.setStrokeStyle(this.data.color);
    ctx.setLineWidth(this.data.pen);
    ctx.setLineCap("round"); // 让线条圆润
    ctx.beginPath();
  },
  //手指触摸后移动
  touchMove: function touchMove(e) {
    var startX1 = e.changedTouches[0].x;
    var startY1 = e.changedTouches[0].y;
    ctx.moveTo(this.data.startX, this.data.startY);
    ctx.lineTo(startX1, startY1);
    ctx.stroke();
    this.data.startX = startX1;
    this.data.startY = startY1;
    //只是一个记录方法调用的容器，用于生成记录绘制行为的actions数组。context跟<canvas/>不存在对应关系，一个context生成画布的绘制动作数组可以应用于多个<canvas/>
    wx.drawCanvas({
      canvasId: "myCanvas",
      reserve: true,
      actions: ctx.getActions() // 获取绘图动作数组
    });
  },
  //手指触摸动作结束
  touchEnd: function touchEnd() {
    
  },
  penSelect: function penSelect(e) {
    //更改画笔大小的方法
    console.log(e.currentTarget);
    this.setData({ pen: parseInt(e.currentTarget.dataset.param) });
  },
  colorSelect: function colorSelect(e) {
    //更改画笔颜色的方法
    console.log(e.currentTarget);
    this.setData({ color: e.currentTarget.dataset.param });
  }
});