// pages/user/user.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
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
    if (app.globalData.userInfo==null){
      wx.redirectTo({
        url: './../login/login',
      })
    }
    else{
      console.log(app.globalData.userInfo);
      this.setData({
        userInfo: app.globalData.userInfo
      })
     
    }
  },
  goToTest:function(){
    wx.navigateTo({
      url: './../test/test',
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