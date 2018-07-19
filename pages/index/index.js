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
        logo:'p0281.jpg',
        title:'开胃虾',
        desc:'明虾',
        price:'88'
      },
      {
        logo: 'p7818.jpg',
        title: '口袋饼',
        desc: '面粉',
        price: '46'
      },
      {
        logo: 'p8489.jpg',
        title: '小米椒炒公鸡',
        desc: '三黄鸡',
        price: '56'
      },
      {
        logo: 'p7933.jpg',
        title: '放心油条',
        desc: '油条',
        price: '2'
      },
      {
        logo: 'p9138.jpg',
        title: '奶油蛋糕',
        desc: '奶油',
        price: '20'
      }
    ]
  },
  toDetail:function(e){
    console.log(e);
    var index=e.currentTarget.dataset.index;
    console.log(index);
  }
})