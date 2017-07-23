var app = getApp(),
  config = app.config;
Page({
    onLoad: function () {
    },
    onShareAppMessage: function () {
        return this.data.shareData
    },
    data: {
        savedFilePath: '../../image/camera.png',
        poetry: '笑颜如花绽，玉音婉转流',
        dialog: {
            hidden: true
        },
        shareData: {
            title: '帮我打个分呗？',
            desc: '投我以木瓜，报之以琼琚。匪报也，永以为好也！',
            path: `/pages/picture/pages/share/share?_id=` + ''
        }
    },
    chooseImage: function () {
        var that = this
        wx.chooseImage({
            count: 1,
            success: function (res) {
                let tempPath = res.tempFilePaths[0];
                //获取上传token
                wx.request({
                    url: config.Url.getUpToken,
                    success: function (res) {
                        //上传文件
                        wx.uploadFile({
                            url: config.Base.qiniuUpload,
                            filePath: tempPath,
                            name: 'file',
                            formData: {
                                token: res.data.uptoken
                            },
                            success: function (res) {
                                let {key} = JSON.parse(res.data);
                                let  savedFilePath = config.Base.imgHost + key + config.Base.fops;
                                //获取诗句
                                wx.request({
                                    url: config.Url.getPoetry,
                                    success: function (res) {
                                        if (res.data.content) {
                                            that.setData({
                                                poetry: res.data.content[0] && res.data.content[0].content,
                                                savedFilePath: savedFilePath
                                            }),
                                              that.saveShare()
                                        }
                                    }
                                })
                            },
                            fail: function (res) {
                                console.log(res)
                            }
                        })
                    }
                })
            }
        })
    },
    saveShare: function () {
        var that = this
        wx.request({
            url: config.Url.saveShare,
            method: 'POST',
            data: {
                sessionId: app.globalData.sessionId,
                image: that.data.savedFilePath,
                author: app.globalData.userInfo,
                poetry: that.data.poetry
            },
            success: function (res) {
                if (res.data.code === 1) {
                    that.setData({
                        shareData:{
                            path: `/pages/picture/pages/share/share?_id=` + res.data.content._id
                        }
                    })
                }
            },
            fail: function (res) {
                console.log(res)
            }
        });
    },
    sharePage: function () {
        var that = this;
        wx.navigateTo({
            url: this.data.shareData.path
        })
    },
    confirm: function () {
        this.setData({
            dialog: {
                hidden: true
            }
        })
    }
})
