//aboutme.js
//获取应用实例
var app = getApp()
Page({
  data: {
    img: '../../images/logo/jujiaodata_logo.png',
    title: "聚焦数据",
    intro:"聚焦数据专注于数据处理，数据分析，前沿的人工智能算法应用，自然语言处理，互联网项目开发（包括微信公众平台服务，企业社区，商城产品，教育培训等），致力于提供优质的互联网产品和服务，是数据科学领域年轻有活力的新生力量。",
    email:"laurlkang@163.com"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
  }
})