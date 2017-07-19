const Url = require('./config').Url;
App({
    onLaunch: function () {
        //调用API从本地缓存中获取数据
    },

    getUserInfo: function (cb) {
        var that = this
        wx.login({
            success: function(res) {
                if (res.code) {
                    wx.request({
                        url: Url.loginUrl,
                        method: 'POST',
                        data: {
                            code: res.code
                        },
                        success:function(res){
                            let content = res.data;
                            if(content.code === 1){
                                console.log(content.message)
                            }
                        },
                        fail:function(res){
                            if(res.code === 1){
                                console.log(res.message)
                            }
                        },
                    })
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        });
    },

    globalData: {
        userInfo: null
    }
})
