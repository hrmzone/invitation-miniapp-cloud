// pages/map/index.js
let plugin = requirePlugin("myPlugin");
const app = getApp();
const uid = app.globalData.uid;
var server = app.globalData.server + "/map";
var appid = app.globalData.appid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
  },
  markertap(e) {
    // console.log(e)
    const db=wx.cloud.database();
    db.collection("main_info").where({
        "appid":appid
    }).get().then(
      res => {
        console.log("markertap",res.data[0])
        var lng=res.data[0].lng
        var lat=res.data[0].lat
        wx.openLocation({
          latitude: parseFloat(lat),
          longitude: parseFloat(lng),
          scale: 18,
          name: res.data[0].hotel,
          address: res.data[0].address,
        }, )
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
    //     //这里源程序有一个错误，res.data.location.lon，数据库location表的字段为lon，但是原程序是res.data.location.lng，导致导航无法获得一个坐标数据
    //     var lng = res.data.location.lon
    //     var lat = res.data.location.lat
    //     wx.openLocation({
    //       latitude: parseFloat(lat),
    //       longitude: parseFloat(lng),
    //       scale: 18,
    //       name: res.data.mainInfo.hotel,
    //       address: res.data.mainInfo.address,
    //       success(res) {
    //         console.log(res)
    //       }
    //     }, )
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this


    wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
      title: '加载中',
      icon: 'loading',
    });
    const db=wx.cloud.database();
    db.collection("main_info").get().then(
      res=>{
        wx.hideLoading();
        var lng = res.data[0].lng
        var lat = res.data[0].lat
        that.setData({
          mainInfo: res.data[0],
          lng: lng, // 全局属性，用来取定位坐标
          lat: lat,
          markers: [{
            iconPath: "/images/nav.png",
            id: 0,
            latitude: lat, // 页面初始化 options为页面跳转所带来的参数 
            longitude: lng,
            width: 50,
            height: 50
          }],
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
    //     // console.log(res.data)
    //     wx.hideLoading();
    //     var lng = res.data.location.lon
    //     var lat = res.data.location.lat
    //     that.setData({
    //       mainInfo: res.data.mainInfo,
    //       lng: lng, // 全局属性，用来取定位坐标
    //       lat: lat,
    //       markers: [{
    //         iconPath: "/images/nav.png",
    //         id: 0,
    //         latitude: lat, // 页面初始化 options为页面跳转所带来的参数 
    //         longitude: lng,
    //         width: 50,
    //         height: 50
    //       }],
    //     });
    //   }
    // })
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
    var that = this;
    //console.log(that.data);
    return {
      title: that.data.mainInfo.share,
      imageUrl: that.data.mainInfo.thumb,
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
  callhe: function(event) {
    wx.makePhoneCall({
      phoneNumber: this.data.mainInfo.he_tel
    })
  },
  callshe: function(event) {
    wx.makePhoneCall({
      phoneNumber: this.data.mainInfo.she_tel
    })
  }
})