//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '客服电话：',
    userInfo: {},
    phoneNumber: '17602108430'
  },
  //事件处理函数
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(user){
      //更新数据
      that.setData({
        userInfo:user && user.userInfo
      })
    })
  },
    makePhoneCall: function () {
        var that = this
        wx.makePhoneCall({
            phoneNumber: that.data.phoneNumber,
            success: function () {
                console.log("成功拨打电话")
            }
        })
    }
})
