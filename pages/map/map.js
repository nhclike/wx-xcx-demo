Page({
  data:{
    markers:[
      {
        id:"1",
        latitude:"38.92",
        longitude:"116.46",
        width:"20",
        height:"20",
        iconPath:"/image/home.png"
      }
    ]
  },
  onReady(e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap')
  },
  getCenterLocation() {
    this.mapCtx.getCenterLocation({
      success(res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation() {
    this.mapCtx.moveToLocation({
      latitude: 23.10229,
      longitude: 113.3345211,
      success(res) {
        console.log(res)
      }
    })
  },
  translateMarker() {
    this.mapCtx.translateMarker({
      markerId: "1",
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints() {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
  }
})