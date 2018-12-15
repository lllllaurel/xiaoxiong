// entry.js

const toolbar = [
  '../../images/nav/download.png', '../../images/nav/fav.png',
  '../../images/nav/share.png', '../../images/nav/comment.png',
];
var remoteurl = 'https://jujiaodata.com/getdetail';
var testurl = 'http://localhost:8000/getdetail';
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp();

Page({
  data: {
    // 当前日志详情
    diary: undefined,

    // 右上角工具栏
    toolbar: toolbar,

    // 图片预览模式
    previewMode: false,

    // 当前预览索引
    previewIndex: 0,

    // 多媒体内容列表
    mediaList: [],
  },

  // 加载日记
  getDiary(params) {
    var that = this;
    let wxprocessor= WxParse;
    let contentid = params.id
    //WxParse.wxParse('newHtml', 'html', newHtml, that, 5);

    wx.request({
      url: remoteurl,
      data: {contentid:contentid},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wxprocessor.wxParse('parsed', 'html', res.data, that, 5);
        console.log('success');
      },
      fail: function (res) {
          console.log('fail');
      }
    })
    // var id = params["id"], diary;
    // app.getDiaryList(list => {
    //   if (typeof id === 'undefined') {
    //     diary = list[0];
    //   } else {
    //     diary = list[id];
    //   }
    // });

    // this.setData({
    //   diary: diary,
    // });
  },

  // 过滤出预览图片列表
  // getMediaList() {
  //   if (typeof this.data.diary !== 'undefined' &&
  //     this.data.diary.list.length) {
  //     this.setData({
  //       mediaList: this.data.diary.list.filter(
  //         content => content.type === 'IMAGE'),
  //     })
  //   }
  // },

  // // 进入预览模式
  // enterPreviewMode(event) {
  //   let url = event.target.dataset.src;
  //   let urls = this.data.mediaList.map(media => media.content);
  //   let previewIndex = urls.indexOf(url);

  //   this.setData({previewMode: true, previewIndex});
  // },

  // // 退出预览模式
  // leavePreviewMode() {
  //   this.setData({previewMode: false, previewIndex: 0});
  // },

  onLoad: function(params) {
    this.getDiary(params);
    // this.getMediaList();
  },

  onHide: function() {
  },

  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      // title: '自定义转发标题',
      // path: '/page/user?id=123'
    }
  }
})
