//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    loginInfo:null,
    appId: "wx2eb1ecbf6bbc8ea3",	//这里换成你的appid
    secret: "76e4bdabd0f16e247c2870aa2df7fe24"   //换成你的密钥
  },
  onLoad: function (options) {
    var that = this;
    wx.login({
      success: (res) => {
        if (res.code) {

          //获取openid
          wx.request({
            url: "https://api.weixin.qq.com/sns/jscode2session",
            data: {
              appid: getApp().globalData.appId,
              secret: getApp().globalData.secret,
              js_code: res.code,
              grant_type: "authorization_code"
            },
            success: (res) => {
              console.log(res);
              that.setData({
                openid: res.data.openid//将openid存起来
              })
            }
          })
        }
      }
    })
  }

})