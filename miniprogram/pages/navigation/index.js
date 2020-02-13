// pages/dirction.js
let plugin = requirePlugin("myPlugin")
const app = getApp();
const lat = app.globalData.lat;
const lon = app.globalData.lon;
const endName = app.globalData.addressName;

let routeInfo = {
  // startLat: 39.90469, //起点纬度 选填
  // startLng: 116.40717, //起点经度 选填
  // startName: "我的位置", // 起点名称 选填
  endLat: lat, // 终点纬度必传
  endLng: lon, //终点经度 必传
  endName: endName, //终点名称 必传
  mode: "car" //算路方式 选填
}

Page({

  /**
   * Page initial data
   */
  data: {
    routeInfo: routeInfo
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})