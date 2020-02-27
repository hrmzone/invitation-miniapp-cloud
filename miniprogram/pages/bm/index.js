// miniprogram/pages/bm/index.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time
    });
  },
  
  onGotUserInfo: function (e) {
    console.log("onGotUserInfo():1", e.detail.errMsg)
    console.log("onGotUserInfo():2", e.detail.userInfo)
    this.setData({
      userinfo: e.detail.userInfo
    })
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if(e.detail.value.username==null) {
      console.log("username is null",this.data.userinfo)
      wx.showToast({
        title: '请填写您的姓名',
        icon: 'none'
      })
      return;
    }

    if (e.detail.value.phone == null) {
      wx.showToast({
        title: '请填写您的电话号码',
        icon: 'none'
      })
      return;
    }

    var reg_tel = new RegExp('^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8}$');
    if (!reg_tel.test(e.detail.value.phone)) {
      wx.showToast({
        title: '请填写正确的手机号码',
        icon: 'none'
      })
      return;
    }

    if (e.detail.value.qq == null) {
      wx.showToast({
        title: '请填写您的QQ',
        icon: 'none'
      })
      return;
    }    

    this.setData({
      username: e.detail.value.username,
      phone: e.detail.value.phone,
      qq: e.detail.value.qq,
      school: e.detail.value.school,
      subject: e.detail.value.subject,
      msg: e.detail.value.msg,
    })
    const db = wx.cloud.database();
    db.collection("wx_user").add({
      data: {
        userinfo: this.data.userinfo,
        username: this.data.username,
        phone: this.data.phone,
        qq: this.data.qq,
        school: this.data.school,
        subject: this.data.subject,
        msg: this.data.msg,
        time:this.data.time
      }
    }).then(
      res => {
        console.log("formSubmit():", res)
        this.setData({
          flag: 0
        })
      }
    )
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})