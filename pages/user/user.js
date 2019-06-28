// pages/user/user.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      avatarUrl:'./../../image/unlogin.png',
      nickName:'点击登录',
      canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    showBadge: false,
    meList: [
      {
        text: '个人最爱',
        icon: '',
        url: ''
      },
      {
        text: '我的订单',
        icon: '',
        url: ''
      },
      {
        text: '历史订单',
        icon: '',
        url: ''
      },
      {
        text: '个人收藏',
        icon: '',
        url: ''
      },
      {
        text: '购物车',
        icon: '',
        url: './../dishes/dishes'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("---------onLoad-----------");
    console.log(app.globalData.userInfo);
    // if (app.globalData.userInfo==null){
    //  // wx.redirectTo({
    //     //url: './../login/login',
    //   //})
    //   wx.getUserInfo({
    //     success(res) {
    //       app.globalData.userInfo = res.userInfo
    //     }
    //   })
    // }
    // else{
    //   console.log(app.globalData.userInfo);
    //   this.setData({
    //     userInfo: app.globalData.userInfo
    //   })
     
    // }
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },
  goToTest:function(){
    wx.navigateTo({
      url: './../test/test',
    })
  },
  goToMap: function () {
    wx.navigateTo({
      url: './../map/map',
    })
  },
  login:function(){
    var _this=this;
    wx.getUserInfo({
      success(res) {
        _this.userInfo = res.userInfo;
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("---------onReady-----------")

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("---------ononShow-----------")

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("---------onHide-----------")

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})