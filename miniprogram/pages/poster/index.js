const app = getApp()
var server = app.globalData.server + "/info";
var appid = app.globalData.appid;
Page({

  /**
   * 页面的初始数据
   */
  data: {

    painting: {},
    shareImage: '',
    mainInfo: {},
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this


    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      })
    }

    let mainInfo = wx.getStorageSync("main")
    if (mainInfo) {
      this.setData({
        mainInfo: mainInfo
      })
    } else {
      wx.request({
        url: server,
        method: 'GET',
        data: {
          'uid': 1,
          'appid': appid
        },
        header: {
          'Accept': 'application/json'
        },
        success: function(res) {
          that.setData({
            mainInfo: res.data
          });
        }
      })
    }
    that.eventDraw()

  },
  eventDraw() {

    wx.showLoading({
      title: '绘制分享图片中',
      mask: true
    })
    var that = this
    // let avatar = that.data.userInfo.avatarUrl
    let nickName = that.data.userInfo.nickName
    // console.log(that.data.mainInfo)
    that.setData({
      painting: {
        width: 375,
        height: 667,
        clear: true,
        views: [
          {
            type: 'image',
            url: '/images/poster.jpg',
            top: 0,
            left: 0,
            width: 375,
            height: 667
          },
          {
            type: 'text',
            content: nickName + ':',
            fontSize: 20,
            color: '#B08B51',
            // color: '#aa2f2f',
            textAlign: 'left',
            top: 340,
            left: 80,
            bolder: true,
            width: 200,
            height: 30
          },
          {
            type: 'text',
            content: that.data.mainInfo.he + '❤️ ' + that.data.mainInfo.she,
            // content: that.data.mainInfo.date,
            fontSize: 12,
            color: '#B08B51',
            textAlign: 'center',
            top: 400,
            left: 220,
            bolder: true,
            width: 375,
            height: 30
          },

          // {
          //     type: 'text',
          //     content: '长按识别二维码',
          //     fontSize: 12,
          //     color: '#333',
          //     textAlign: 'left',
          //     top: 578,
          //     left: 20,
          //     bolder: true,
          //     width: 100,
          //     height: 20
          // },
          {
            type: 'image',
            url: that.data.mainInfo.qrimg,
            top: 430,
            left: 137,
            width: 100,
            height: 100
          },
          {
            type: 'image',
            url: that.data.mainInfo.thumb,
            top: 180,
            left: 75,
            width: 220,
            height: 150
          }
        ]
      }
    })
    // console.log(this.data.painting)
  },
  eventSave() {
    // console.log(this.data.shareImage)
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImage,
      success(res) {
        wx.showToast({
          title: '保存图片成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  eventGetImage(event) {
    console.log(event)
    wx.hideLoading()
    const {
      tempFilePath
    } = event.detail
    this.setData({
      shareImage: tempFilePath
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})