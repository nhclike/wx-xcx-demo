// canvas 全局配置
var context = null;
var isButtonDown = false;
var arrx = [];
var arry = [];
var arrz = [];
var canvasw = 0;
var canvash = 0;
//注册页面
Page({
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  //开始
  canvasStart: function (event) {
    isButtonDown = true;
    arrz.push(0);
    arrx.push(event.changedTouches[0].x);
    arry.push(event.changedTouches[0].y);

  },
  data: {
    src: "",
    img: "./../../image/n4.png",
    rpx: ''
  },

  onLoad: function (options) {
    var that = this
    // 使用 wx.createContext 获取绘图上下文 context
    context = wx.createCanvasContext('canvas');
    context.beginPath()
    context.setStrokeStyle('#000000');
    context.setLineWidth(4);
    context.setLineCap('round');
    context.setLineJoin('round');
    const query = wx.createSelectorQuery()
    query.select('#canvas').boundingClientRect((rect =>{
      console.log(rect);
      canvasw=rect.width;
      canvash=rect.height;
      console.log("canvasw" + canvasw + "canvash" + canvash);
      context.drawImage(this.data.img, 0, 0, 686, 686);
      context.draw()
    })).exec();
    
  },

  //过程
  canvasMove: function (event) {
    var that = this
    if (isButtonDown) {
      arrz.push(1);
      console.log(event)
      arrx.push(event.changedTouches[0].x);
      arry.push(event.changedTouches[0].y);
    };

    for (var i = 0; i < arrx.length; i++) {
      if (arrz[i] == 0) {
        context.moveTo(arrx[i], arry[i])
      } else {
        context.lineTo(arrx[i], arry[i])
      };

    };
    context.setStrokeStyle('#000000');
    context.setLineWidth(4);
    context.setLineCap('round');
    context.setLineJoin('round');
    context.stroke();
    //第一个参数为true表示接着之前的画；默认为false，画之前先清空
    context.draw(true,function(e){
      console.log("draw callback!");
    });
  
  },
  // 点击保存图片
  clickMe: function () {
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      fileType: 'jpg',
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            console.log(res)
            wx.hideLoading();
            wx.showToast({
              title: '保存成功',
            });
            // //存入服务器
            // wx.uploadFile({
            //   url: 'a.php', //接口地址
            //   filePath: res.tempFilePath,
            //   name: 'file',
            //   formData: {                                 //HTTP 请求中其他额外的 form data 
            //     'user': 'test'
            //   },
            //   success: function (res) {
            //     console.log(res);

            //   },
            //   fail: function (res) {
            //     console.log(res);
            //   },
            //   complete: function (res) {
            //   }
            // });
          },
          fail() {
            wx.hideLoading()
          }
        })
      }
    })
  },
  canvasEnd: function (event) {
    isButtonDown = false;
  },
  cleardraw: function () {
    //清除画布
    arrx = [];
    arry = [];
    arrz = [];
    context.draw(false);
  },

})
