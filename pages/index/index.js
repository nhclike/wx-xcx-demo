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
        logo: 'l7.png',
        title: '冰淇淋',
        desc: '奶油',
        price: '10'
      },
      {
        logo: 'l2.jpg',
        title: '口袋饼',
        desc: '面粉',
        price: '46'
      },
      {
        logo:'l1.jpg',
        title:'油爆虾',
        desc:'明虾',
        price:'88'
      },
      {
        logo: 'l8.jpg',
        title: '蛋饺',
        desc: '鸡蛋',
        price: '16'
      },
      {
        logo: 'l3.jpg',
        title: '小米椒炒公鸡',
        desc: '三黄鸡',
        price: '56'
      },
      {
        logo: 'l4.jpg',
        title: '放心油条',
        desc: '油条',
        price: '2'
      },
      {
        logo: 'l5.jpg',
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