// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    passWord:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  login:function(){
    //更新登录信息
    app.globalData.loginInfo={
      userName:this.data.userName,
      passWord:this.data.passWord
    }
    //获得微信用户信息
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      console.log(userInfo);
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    //跳转到用户页面
    wx.switchTab({
      url: './../user/user',
    })
  },
  inputChangePassWord:function(e){
    console.log(e);
    this.setData({
      passWord:e.detail.value
    })
  },
  inputChangeUserName: function (e) {
    console.log(e);
    this.setData({
      userName: e.detail.value
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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