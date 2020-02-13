// pages/bless/index.js

const app = getApp();
var server = app.globalData.server + "/bless";
var appid = app.globalData.appid;
const uid = app.globalData.uid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    actionSheetHidden: true,
    painting: {},
    shareImage: '',
    qrcode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this


    let userInfo = wx.getStorageSync('userInfo')
    // console.log(userInfo)
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      })
    }

    wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
      title: '加载中',
      icon: 'loading',
    });
    const db=wx.cloud.database();
    db.collection("bless").get().then(
      res=>{
        wx.hideLoading();
        // console.log(res.data)
        that.setData({
          // mainInfo: res.data.mainInfo,
          zanLog: res.data,
          zanNum: res.data.length,
          // slideList: res.data.slideList
        });
      }
    )

    // wx.request({
    //   url: server,
    //   method: 'GET',
    //   data: {
    //     'uid': uid,
    //     'appid': appid
    //   },
    //   header: {
    //     'Accept': 'application/json'
    //   },
    //   success: function(res) {
    //     wx.hideLoading();
    //     // console.log(res.data)
    //     that.setData({
    //       // mainInfo: res.data.mainInfo,
    //       zanLog: res.data,
    //       zanNum: res.data.length,
    //       // slideList: res.data.slideList
    //     });
    //   }
    // })
  },
  openActionsheet: function() {
    var self = this;
    self.setData({
      actionSheetHidden: !self.data.actionSheetHidden
    });
  },
  listenerActionSheet: function() {
    var self = this;
    self.setData({
      actionSheetHidden: !self.data.actionSheetHidden
    })
  },
  createPoster: function() {

    wx.navigateTo({
      url: '/pages/poster/index',
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
    var that = this;

    // wx.request({
    //   url: server,
    //   method: 'GET',
    //   data: {
    //     'c': 'info',
    //     'appid': appid
    //   },
    //   header: {
    //     'Accept': 'application/json'
    //   },
    //   success: function(res) {
    //     // console.log(res.data)
    //     that.setData({
    //       zanLog: res.data,
    //       zanNum: res.data.length,
    //     });
    //   }
    // })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
      title: '加载中',
      icon: 'loading',
    });
    const db=wx.cloud.database()
    db.collection("bless").get().then(
      res => {
        wx.hideLoading();
        // console.log(res.data)
        this.setData({
          // mainInfo: res.data.mainInfo,
          zanLog: res.data,
          zanNum: res.data.length,
          // slideList: res.data.slideList
        });
      }
    )
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    var that = this;
    //console.log(that.data);
    return {
      title: "石家庄理工学院欢迎您",
      imageUrl: "cloud://sjzlgedu-rb4xv.736a-sjzlgedu-rb4xv-1301259260/校园环境11.jpg",
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
  bindgetuserinfo: function(e) {
    // console.log(e.detail.userInfo);
    var that = this;
    if (e.detail.userInfo) {
      wx.setStorageSync('userInfo', e.detail.userInfo)
      that.setData({
        userInfo: e.detail.userInfo,
        authBtn: false
      })
      var userInfo = e.detail.userInfo;
      var name = userInfo.nickName;
      var face = userInfo.avatarUrl;
      const db=wx.cloud.database();
      db.collection("bless").add({
        data:{
          'uid': 1,
          'nickName': userInfo.nickName,
          'gender': userInfo.gender,
          'language': userInfo.language,
          'city': userInfo.city,
          'province': userInfo.province,
          'country': userInfo.country,
          'avatarUrl': userInfo.avatarUrl,
        }
      }
      ).then(
        res=>{
          console.log("bindgetuserinfo",res)
          db.collection("bless").get().then(
            res => {
              // console.log(res.data)
              this.setData({
                // mainInfo: res.data.mainInfo,
                zanLog: res.data,
                zanNum: res.data.length,
                // slideList: res.data.slideList
              });
            }
          )
        }
      )
      // wx.request({
      //   url: server,
      //   data: {
      //     'uid': 1,
      //     'nickName': userInfo.nickName,
      //     'gender': userInfo.gender,
      //     'language': userInfo.language,
      //     'city': userInfo.city,
      //     'province': userInfo.province,
      //     'country': userInfo.country,
      //     'avatarUrl': userInfo.avatarUrl,
      //   },
      //   header: {
      //   },
      //   method: "POST",
      //   dataType: "json",
      //   success: res => {
      //     console.log(res.data);
      //     if (res.data.success) {
      //       that.setData({
      //         zanLog: res.data.obj,
      //         zanNum: res.data.obj.length,
      //       });
      //       wx.showModal({
      //         title: '提示',
      //         content: res.data.msg,
      //         showCancel: false
      //       })
      //     } else {
      //       wx.showModal({
      //         title: '提示',
      //         content: res.data.msg,
      //         showCancel: false
      //       })
      //     }
      //   }
      // })

    } else {
      wx.showToast({
        title: "为了您更好的体验,请先同意授权",
        icon: 'none',
        duration: 2000
      });
    }
  },

  // 送上祝福
  zan: function(event) {
    console.log(1, event)
    var that = this;

    var userInfo = that.data.userInfo;
    console.log(userInfo)
    var name = userInfo.nickName;
    var face = userInfo.avatarUrl;
    var language = userInfo.language;
    var city = userInfo.city;
    const db=wx.cloud.database();
    db.collection("bless").add({
      data:{
        'uid': uid,
        'nickName': userInfo.nickName,
        'gender': userInfo.gender,
        'language': userInfo.language,
        'city': userInfo.city,
        'province': userInfo.province,
        'country': userInfo.country,
        'avatarUrl': userInfo.avatarUrl,
      }
    }).then(
      res=>{
        console.log("zan",res)
        db.collection("bless").get().then(
          res => {
            // console.log(res.data)
            that.setData({
              // mainInfo: res.data.mainInfo,
              zanLog: res.data,
              zanNum: res.data.length,
              // slideList: res.data.slideList
            });
          }
        )
      }
    )
    // wx.request({
    //   url: server,
    //   data: {
    //     'uid': uid,
    //     'nickName': userInfo.nickName,
    //     'gender': userInfo.gender,
    //     'language': userInfo.language,
    //     'city': userInfo.city,
    //     'province': userInfo.province,
    //     'country': userInfo.country,
    //     'avatarUrl': userInfo.avatarUrl,
    //   },
    //   header: {},
    //   method: "POST",
    //   dataType: "json",
    //   success: res => {
    //     // console.log(res.data);
    //     if (res.data.success) {
    //       that.setData({
    //         zanLog: res.data.obj,
    //         zanNum: res.data.obj.length,
    //       });
    //       wx.showModal({
    //         title: '提示',
    //         content: res.data.msg,
    //         showCancel: false
    //       })
    //     } else {
    //       wx.showModal({
    //         title: '提示',
    //         content: res.data.msg,
    //         showCancel: false
    //       })
    //     }
    //   }
    // })
  },
})