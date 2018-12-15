const config = require("../../config");
var WxParse = require('../../wxParse/wxParse.js');
var remoteurl = getApp().globalData.rootUrl+'getlist';
var testurl = 'http://localhost:8000/getlist';
var app = getApp();

Page({

  data: {
    // 文章列表
    diaries: [],
    // 加载中提示
    hidden: true,
    // 是否显示loading
    // showLoading: false,
    // loading提示语
    loadingMessage: '',
    // 提示非Wi-Fi环境
    firstReminder:1,
    lastid:0,
    once:5,
    height:'',
    confirmHidden:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(param) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight
        })
      }
    })

    //显示出加载中的提示
    this.setData({loadHidden:false})
    this.getDiaries();
    // wx.showLoading({
    //   title: '请选择地点',
    // })
    // setTimeout(function () {
    //   wx.hideLoading()
    // }, 2000)
  },

  /**
   * 获取文章列表
   * 目前为本地缓存数据 + 本地假数据
   * TODO 从服务端拉取
   */
  getDiaries() {
    var that = this;
    let last = that.data.lastid;
    let one = that.data.once;
    wx.request({
      url: remoteurl,
      data: {lastid:last+one, once:one},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if(last==0){
          wx.setStorageSync('contentsList', res.data)
        }
        if (res.data.length == 0) {
          wx.showToast({
            title: '没有更多文章了！',
            icon: 'succes',
            duration: 2000,
            mask: true
          })
          return false
        };
        let tempArr = res.data;
        let arr = that.data.diaries;
        for (let i = 0; i < tempArr.length; i++) {
          tempArr[i].cover = remoteurl + '/' + tempArr[i].cover;
        }
        arr.push(...tempArr);
        //拼装封面url
        
        that.setData({ diaries: arr, lastid: last + one})
      },
      fail: function (res) {
        if (last == 0) {
          let arr = [];
          let once = that.data.once
          let storageData = wx.getStorageSync('contentsList');
          arr.push(...storageData);
          that.setData({ diaries: arr, lastid: last + one })
        }
      },
      complete: function(){
          //显示出加载中的提示
          that.setData({loadHidden:true})         
      }
    })
  },

  // 查看详情
  showDetail(event) {
    wx.navigateTo({
      url: '../entry/entry?id=' + event.currentTarget.id,
    });
  },

  // 加载更多
  loadMore: function(event){
    var that = this
    //let last = that.data.diaries.length
    let last = that.data.lastid
    let one = that.data.once;    

    wx.getNetworkType({
      success: function(res) {
        var networkType = res.networkType // 返回网络类型2g，3g，4g，wifi

        if(networkType!='wifi'&&that.data.firstReminder){
           that.setData({confirmHidden:false, firstReminder:false})
        }
      }
    })
    this.getDiaries();
  },
    modalChange: function(){
      this.setData({confirmHidden:true})
    }
})