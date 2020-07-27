//获取应用实例
const app = getApp()
Page({

  data: {
    avatar: '',
    name: ''
  },

  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    });
    this.setData({
      avatar: this.data.userInfo.avatarUrl || 'https://yunlaiwu0.cn-bj.ufileos.com/teacher_avatar.png',
      name: this.data.userInfo.nickName || '' ,
      city: this.data.userInfo.city
    });

  },

  //未点完成失去焦点复原（change优先于blur触发）
  blurName: function(e) {
    this.setData({ name: wx.getStorageSync('name') });
  },

  changeName: function(e) {
    var name = e.detail.value.trim();

    if(name) {
      wx.setStorageSync('name', name);
    }

  },

  changeAvatar: function(e) {

    var that = this;
    
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        wx.saveFile({
          tempFilePath: tempFilePaths[0],
          success: function (res) {
            var savedFilePath = res.savedFilePath;
            wx.setStorageSync('avatar', savedFilePath);
            that.setData({avatar: savedFilePath});
          }
        });
      }
    })
  }
})