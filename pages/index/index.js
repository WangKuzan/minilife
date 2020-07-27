Page({
  data: {
    hitokoto: "",
    from: "" ,
    getStatus: false
  },
  onLoad: function () {
    this.getHitokotoData();
  },

  getHitokotoData: function(){
    var that = this;
    wx.showNavigationBarLoading()
    wx.request({
      //一言 api
      url: 'https://v1.hitokoto.cn/',
      header: {
        "content-type":"json"
      },
      success: function(res){
        that.setData({
          hitokoto: res.data.hitokoto,
          from: res.data.from,
          getStatus : false ,
        })
      },
      fail: function(){
        wx.hideNavigationBarLoading()
      },
      complete: function(){
        wx.hideNavigationBarLoading()
      },
    })
  },

  f1: function(){
    var that = this;
    // console.log(wx.getStorageSync('openid'));
    let openid =  wx.getStorageSync('openid');
    if(openid == null && openid == ''){
      wx.showToast({
        title: '请登录！',
        icon: 'none',
        duration: 1500
      })
    }else{
      if(this.data.getStatus){
        wx.request({
          url: 'https://www.wongkuzan.cn/cloudserver/hitokoto/delUserHitokotoData',
          data: {
            hitokoto: this.data.hitokoto,
            from : this.data.from,
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
          url: 'https://www.wongkuzan.cn/cloudserver/hitokoto/setUserHitokotoData',
          data: {
            hitokoto: this.data.hitokoto,
            from : this.data.from,
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
  }
})
