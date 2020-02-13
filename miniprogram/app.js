//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'sjzlgedu-rb4xv',
        traceUser: true,
      })
    }

    // this.globalData = {}
  },
  onHide: function () {
    wx.pauseBackgroundAudio();
  },
  onShow: function () {
    wx.playBackgroundAudio()
  },
  globalData: {
    userInfo: null,

    // 下面填写酒店相关信息
    // lat: 30.295140,
    // lon: 112.293510,
    // addressName: "荆州市沙市区江津东路100",

    appid: 'wxd6b428898032cf55', //此处改成您自己的小程序appid
    uid: 1,
    server: 'https://wx.jzyouth.com/wx',
    music_url: ''
  }
})
