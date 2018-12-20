const config = require("../../config");
var WxParse = require('../../wxParse/wxParse.js');
var url = getApp().globalData.rootUrl+'getlist';
var app = getApp();
var searchValue='';
Page({

  data: {
    // 文章列表
    diaries: [],
    // 加载中提示
    hidden: true,
    // loading提示语
    loadingMessage: '',
    // 提示非Wi-Fi环境
    firstReminder:1,
    lastid:0,
    once:10,
    height:'',
    confirmHidden:true,
    backBtnShow:"none",
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
  },

  /**
   * 获取文章列表
   * 目前为本地缓存数据 + 本地假数据
   */
  getDiaries() {
    var that = this;
    let last = that.data.lastid;
    let one = that.data.once;
    if (last < 0) {
      return false;
    };
    wx.request({
      url: url,
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
          tempArr[i].cover = url + '/' + tempArr[i].cover;
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
    // var that = this
    // let last = that.data.lastid
    // let one = that.data.once;    

    // wx.getNetworkType({
    //   success: function(res) {
    //     var networkType = res.networkType // 返回网络类型2g，3g，4g，wifi

    //     if(networkType!='wifi'&&that.data.firstReminder){
    //        that.setData({confirmHidden:false, firstReminder:false})
    //     }
    //   }
    // })
    this.getDiaries();
  },
  modalChange: function(){
    this.setData({confirmHidden:true})
  },
  // 获取搜索条关键字
  searchValueInput: function (e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value,
    });
  },
  // 搜索
  fetchInfo: function (e) {
    var that = this;
    let lastid = that.data.lastid;
    wx.request({
      url: getApp().globalData.rootUrl+'search',
      method: 'get',
      data: { keyword: that.data.searchValue},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let tempArr = res.data;
        for (let i = 0; i < tempArr.length; i++) {
          tempArr[i].cover = url + '/' + tempArr[i].cover;
        };
        that.setData({ diaries: tempArr, lastid: -999, backBtnShow: "block"});
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    });
  },
  // 返回重置列表页
  backToMainList:function(e){
    var that = this;
    that.setData({lastid: 0, diaries:[]});
    that.loadMore();
  }
})