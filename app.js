const config = require('/config');
App({
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        this.getUserInfo()
    },

    getUserInfo: function (cb) {
        let self = this
        if (self.globalData.sessionId) {
            typeof cb == "function" && cb(this.globalData)
        }
        wx.checkSession({
            success: function (res) {
                if (!self.globalData.sessionId) {
                    self.login(cb);
                }
            },
            fail: function () {
                //登录态过期
                self.login(cb)
            }
        })
    },
    login: function (cb) {
        let self = this
        wx.login({
            success: function (res) {
                let code = res.code
                if (code) {
                    wx.getUserInfo({
                        success: function (res) {
                            self.globalData.userInfo = res.userInfo
                            wx.request({
                                url: config.Url.loginUrl,
                                method: 'POST',
                                data: {
                                    code: code,
                                    userInfo: self.globalData.userInfo
                                },
                                success: function (res) {
                                    let body = res.data;
                                    if (body.code === 1) {
                                        let {sessionId} = body.content;
                                        self.globalData.sessionId = sessionId;
                                    }
                                    typeof cb == "function" && cb(this.globalData)
                                }
                            })
                        }

                    })
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        });
    },
    globalData: {
        sessionId: null,
        userInfo: null
    },
    config: config
})
