// 聊天室
var url = 'ws://localhost:8081';

function connect(user,func) {
  wx.connectSocket({
    url: url,
    header:{'content-type': 'application/json'},
    success: function () {
      console.log('信道连接成功~')
    },
    fail: function () {
      console.log('信道连接失败~')
    } 
  })
  wx.onSocketOpen(function (res) {
     wx.showToast({
       title: '信道已开通~',
       icon: "success",
       duration: 2000
     })
     //接受服务器消息
    wx.onSocketMessage(func);
  });
  wx.onSocketError(function (res) {
    wx.showToast({
      title: '信道连接失败，请检查！',
      icon: "none",
      duration: 2000
    })
  })  
}
//发送消息
function send(msgObj) {
  wx.sendSocketMessage({ 
    data: JSON.stringify(msgObj),
    success:res=>{
      console.log("已经发送的消息",res)
    } 
  });
}
module.exports = {
  connect: connect,
  send: send
}