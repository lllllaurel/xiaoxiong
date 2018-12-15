//aboutme.js
//获取应用实例
var app = getApp()
Page({
  data: {
    img: '../../images/logo/jujiaodata_logo.png',
    title: "聚焦数据",
    intro:"聚焦数据(jujiaodata.com)是一家具有创新思维的互联网公司，主要从事数据处理，数据分析，前沿的人工智能算法应用，自然语言处理，互联网项目开发（包括微信公众平台服务，企业社区，商城产品，教育培训等）。公司由有多年互联网经验的人员组成，致力于提供优质的互联网产品和服务，是东北地区最有实力和活力的创业公司。",
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