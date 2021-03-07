//index.js
//获取应用实例
const app = getApp();
var appid = app.globalData.appid;
var mainData;

Page({
  data: {
    userInfo: {},
    slideList: []
  },
  onLoad: function() {
    var that = this

    wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
      title: '加载中',
      icon: 'loading',
    });
    wx.getStorage({
      key: 'main',
      success: function(res) {
        // console.log(res)
        mainData = res.data
        console.log(mainData)
      },
    })
    const db=wx.cloud.database();
    db.collection("photo").get().then(
      res => {
        this.setData({
          slideList: res.data
        })
        console.log(res.data)
        wx.hideLoading();
      }
    )
  },

  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  onShareAppMessage: function(res) {
    return {
      title: mainData.share,
      imageUrl: mainData.thumb,
      path: 'pages/index/index',
      success: function(res) {
        wx.showToast({
          title: '分享成功',
        })
      },
      fail: function(res) {
        // 转发失败
        wx.showToast({
          title: '分享取消',
        })
      }
    }
  },
  onShareTimeline: function(){


  },
  previewImage: function(e) {
    var imgsurl = []
    var imgObj = this.data.slideList
    for (var i = 0; i < imgObj.length; i++) {
      imgsurl[i] = imgObj[i]['image']
    }
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: imgsurl // 需要预览的图片http链接列表
    })
  },
})