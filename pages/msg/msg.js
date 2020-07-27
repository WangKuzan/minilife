//index.js
//实现函数
Page({
  data: {
    title: "",
    msg: ""
  },
  addMsg: function() {
    var that = this ;
    let tokenid = wx.getStorageSync('openid')
    if(tokenid == null && tokenid == ''){
      wx.showToast({
        title: '请登录！',
        icon: 'none',
        duration: 1500
      })
    }else{
      wx.request({
        url: 'https://www.wongkuzan.cn/cloudserver/msg/addMsg',
        data: {
          title: that.data.title,
          msg: that.data.msg,
          tokenid: tokenid,
          channel: 'wx',
        },
        header: {
          "content-type":"json"
        },
        success: function(res){
          if(res.statusCode == 200){
            wx.showToast({
              title: '发送成功！',
              icon: 'none',
              duration: 1500
            })
          }else{
            wx.showToast({
              title: '网络异常！',
              icon: 'none',
              duration: 1500
            })
          }
        },
        fail: function(){
          console.log(res)
        }
      })
    }
  },
  changeInputTitle: function(event) {
    var that = this ;
    that.setData({
      title:event.detail.value
    })
  },
  changeInputMsg: function(event) {
    var that = this ;
    that.setData({
      msg:event.detail.value
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
 })