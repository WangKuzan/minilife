Page({
  
  data: {
    strpage: 0,
    pagesize: 20,
    HitokotoData: [],
    hasmoreData:  true,
    hiddenloading: true,
  },
  
  onLoad: function () {
    this.getHitokotoData();
  },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    this.getHitokotoData();
  },
  getHitokotoData: function(){
    var that = this;
    wx.showNavigationBarLoading()
    wx.request({
      //一言 api
      url: 'https://www.wongkuzan.cn/cloudserver/hitokoto/getUserHitokotoData',
      data: {
        strpage: that.data.strpage,
        pagesize: that.data.pagesize,
        tokenid: wx.getStorageSync('openid')
      },
      header: {
        "content-type":"json"
      },
      success: function(res){
        if(res.statusCode == 200){
          var datalist = res.data.data.content
          if(datalist.length < that.data.pagesize){
            that.setData({
              HitokotoData: that.data.HitokotoData.concat(datalist),
              hasmoreData: false ,
              hiddenloading: true ,
              strpage: that.data.strpage + 1,
            })
          }else{
            that.setData({
              HitokotoData: that.data.HitokotoData.concat(datalist),
              strpage: that.data.strpage + 1,
              hiddenloading: false ,
            })
          }
        }
        wx.hideNavigationBarLoading()
      },
      fail: function(){
        wx.hideNavigationBarLoading()
      },
      complete: function(){
        wx.hideNavigationBarLoading()
      },
    })
  },
})