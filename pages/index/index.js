Page({
  data: {
    imgUrls: [
      './../../image/n1.png',
      './../../image/n2.png',
      './../../image/n3.png',
      './../../image/n4.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
    proList:[
      {
          logo:"l1",
          title:"开胃虾",
          desc:"虾，白糖",
          price:"233"
      },
      {
        logo: "l1",
        title: "开胃虾",
        desc: "虾，白糖",
        price: "233"
      },
      {
        logo: "l1",
        title: "开胃虾",
        desc: "虾，白糖",
        price: "233"
      },
      {
        logo: "l1",
        title: "开胃虾",
        desc: "虾，白糖",
        price: "233"
      },
      {
        logo: "l1",
        title: "开胃虾",
        desc: "虾，白糖",
        price: "233"
      },
      {
        logo: "l1",
        title: "开胃虾",
        desc: "虾，白糖",
        price: "233"
      },
      {
        logo: "l1",
        title: "开胃虾",
        desc: "虾，白糖",
        price: "233"
      },
      {
        logo: "l1",
        title: "开胃虾",
        desc: "虾，白糖",
        price: "233"
      },
      {
        logo: "l1",
        title: "开胃虾",
        desc: "虾，白糖",
        price: "233"
      },
      {
        logo: "l1",
        title: "开胃虾",
        desc: "虾，白糖",
        price: "233"
      }]
  },
  toDetail:function(e){
    console.log(e);
    wx.navigateTo({
      url: './../detail/detail',
    })
  },
  upper(e) {
    console.log(e)
  },
  lower(e) {
    console.log(e)
  },
  scroll(e) {
    console.log(e)
  },
  onLoad:function(){
    
  },
  getList:function(){
    var self=this;
    wx.request({
      url: 'http://127.0.0.1:5000',
      method:'GET',
      success:function(res){
        console.log(res)
      }
    })
  }
})