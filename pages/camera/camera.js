var utils = require("../../utils/util.js");

Page({
  data:{
    unsplash: {},
    getStatus: false,
    strpage: 0,
    pagesize: 10,
    unsplashList: [],
    hasmoreData:  true,
    hiddenloading: true,
  },
  //预览图片，放大预览
  preview: function(event) {
    let currentUrl = event.currentTarget.dataset.fullUrl
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: [currentUrl] // 需要预览的图片http链接列表
    })
  },
  errorFunction: function(){
    this.setData({
      avatar: '/images/photo/dev.jpeg'
    })    
  },
  longPress:function(event){
    let currentUrl = event.currentTarget.dataset.fullUrl
    wx.showModal({
      title: '提示',
      content: '确定要保存这张图片吗？',
      success: function (res) {
          if (res.confirm) {
              wx.getImageInfo({
                  src: "https://www.wongkuzan.cn/"+currentUrl,
                  success: function (res) {
                      console.log(res);
                      var path = res.path;
                      wx.saveImageToPhotosAlbum({
                          filePath: path,
                          success: function (res) {
                              console.log('图片已保存');
                          },
                          fail: function (res) {
                              console.log('保存失败');
                          }
                      })
                  }
              });
          } else if (res.cancel) {
              console.log('用户点击取消')
          }
      }
    })
  },
  onLoad: function () {
   this.getUnsplashDataList();
  },
  /**
  * 页面上拉触底事件的处理函数
  */
   onReachBottom: function () {
     this.getUnsplashDataList();
   },
  getUnsplashDataList: function(){
    var that = this;
    wx.request({
      url: 'https://www.wongkuzan.cn/cloudserver/wxUnsplash/getUnsplashata',
      data: {
        strpage: that.data.strpage,
        pagesize: that.data.pagesize,
      },
      header: {
        "content-type":"json"
      },
      success: function(res){
        if(res.statusCode == 200){
          var datalist = res.data.data.content
          if(datalist.length < that.data.pagesize){
            that.setData({
              unsplashList: that.data.unsplashList.concat(res.data.data.content),
              hasmoreData: false ,
              hiddenloading: true ,
              strpage: that.data.strpage + 1,
            })
          }else{
            that.setData({
              unsplashList: that.data.unsplashList.concat(res.data.data.content),
              strpage: that.data.strpage + 1,
              hiddenloading: false ,
            })
          }
        }
      },
      fail: function(){
        console.log(res)
      }
    })
  },
  f1: function(){
    var that = this;
    // console.log(wx.getStorageSync('openid'));
    if(this.data.getStatus){
      wx.request({
        url: 'https://www.wongkuzan.cn/cloudserver/wxUserUnsplash/delWxUserUnsplashata',
        data: {
          unsplashid: this.data.unsplash.id,
          tokenid: wx.getStorageSync('openid')
        },
        header: {
          "content-type":"json"
        },
        success: function(res){
          if(res.statusCode == 200){
            that.setData({
              getStatus : false 
            }),
            wx.showToast({
              title: '取消收藏！',
              icon: 'none',
              duration: 1500
            })
          }
        },
        fail: function(){
          wx.showToast({
            title: '网络异常！',
            icon: 'none',
            duration: 1500
          })
        }
      })
    }else{
      wx.request({
        url: 'https://www.wongkuzan.cn/cloudserver/wxUserUnsplash/setWxUserUnsplashata',
        data: {
          unsplashid: this.data.unsplash.id,
          tokenid: wx.getStorageSync('openid')
        },
        header: {
          "content-type":"json"
        },
        success: function(res){
          if(res.statusCode == 200){
            that.setData({
              getStatus : true 
            })
            wx.showToast({
              title: '收藏成功！',
              icon: 'none',
              duration: 1500
            })
          }
        },
        fail: function(){
          wx.showToast({
            title: '网络异常！',
            icon: 'none',
            duration: 1500
          })
        }
      })
    }
  }

})