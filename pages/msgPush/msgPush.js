Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: "", //（这个不要改）这里为空值，待获取到openid时，会给它重新赋值.openid在app.js中获取
    token: "",

    //要推送的内容
    push_content_data: [
      //keyword1
      {
        value: "李调解员",
        color: "#4a4a4a"
      },
      //keyword2
      {
        "value": "2019-12-26 10:00:00",
        "color": "#9b9b9b"
      },
      //keyword3
      {
        "value": "对李四家庭调解",
        "color": "#9b9b9b"
      },
      //keyword4
      {
        "value": "张三，何平，孙权",
        "color": "#9b9b9b"
      }
    ]

  },

  //发送模板消息
  template_Msg: function (e) {
    wx.showLoading({ //期间为了显示效果可以添加一个过渡的弹出框提示“加载中”  
      title: '加载中',
      icon: 'loading',
    });

    //获取access_token
    wx.request({
      url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + getApp().globalData.appId + "&secret=" + getApp().globalData.secret,
      success: (res) => {
        console.log(res);
        this.setData({
          token: res.data.access_token //将access_token存到data的token里
        });
        console.log("access_token:" + this.data.token);
        var fId = e.detail.formId; //获取formId
        console.log("formId:" + fId);
        var access_token_url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + this.data.token;
        var push_content = {
          "keyword1": this.data.push_content_data[0],
          "keyword2": this.data.push_content_data[1],
          "keyword3": this.data.push_content_data[2],
          "keyword4": this.data.push_content_data[3]
        };
        console.log(push_content)
        wx.request({
          url: access_token_url,

          //注意不要用value代替data
          data: {
            touser: this.data.openid,
            template_id: 'mQ8Gx4ZWH9OGNI_m3FUY9WtPa8VJLYkrmZ_gNZaLJuA', //换成你申请的模板消息id，  
            page: '/pages/msgPush/msgPush',
            form_id: fId,
            data: push_content,
            color: '#ccc',
            emphasis_keyword: 'keyword3.DATA'
          },
          method: 'POST',
          success: function (res) {
            wx.hideLoading();
            console.log("发送成功");
            console.log(res);
          },
          fail: function (err) {
            // fail  
            console.log("push err")
            console.log(err);
          }
        });

      }
    });
  },
  //发送订阅消息
  subscribe_Msg:function(){
    var _this=this;
    wx.requestSubscribeMessage({
      tmplIds: ['mQ8Gx4ZWH9OGNI_m3FUY9WtPa8VJLYkrmZ_gNZaLJuA'],
      success(res) { 
        //获取access_token
        wx.request({
          url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + getApp().globalData.appId + "&secret=" + getApp().globalData.secret,
          success: (res) => {
            console.log(res);
            _this.setData({
              token: res.data.access_token //将access_token存到data的token里
            });
            console.log("access_token:" + _this.data.token);
            
            var access_token_url = 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + _this.data.token;
            var push_content = {
              "name1": {
                "value": "某某"
              },
              "date2": {
                "value": "2019-12-27 10:00:00"
              },
              "thing3": {
                "value": "对李四家庭调解"
              },
              "thing4": {
                "value": "张三，李四，王五"
              }
            };
            console.log(push_content)
            console.log("openid:" + _this.data.openid);
            wx.request({
              url: access_token_url,
              data:{
                touser: _this.data.openid,
                template_id: 'mQ8Gx4ZWH9OGNI_m3FUY9WtPa8VJLYkrmZ_gNZaLJuA', //换成你申请的订阅消息id，  
                page: '/pages/msgPush/msgPush',
                data: push_content
              },
              method: 'POST',
              success: function (res) {
                wx.hideLoading();
                console.log("发送成功");
                console.log(res);
              },
              fail: function (err) {
                // fail  
                console.log("push err")
                console.log(err);
              }
            });
          }
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.login({
      success: (res) => {
        if (res.code) {
          wx.request({
            url: "https://api.weixin.qq.com/sns/jscode2session",
            data: {
              appid: getApp().globalData.appId, //从app.js中获得你的appid
              secret: getApp().globalData.secret, //从app.js中获得你的secret
              js_code: res.code,
              grant_type: "authorization_code"
            },
            success: (res) => {
              console.log(res);
              that.setData({
                openid: res.data.openid //存储openid
              })
            }
          })
        }
      }
    })
  } //onLoad
}) //Pages
