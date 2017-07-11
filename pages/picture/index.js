Page({
    tempImage : '../../image/camera.png',
    onLoad: function () {
        this.setData({
            savedFilePath: wx.getStorageSync('savedFilePath') || this.tempImage
        })
    },
    onShareAppMessage: function () {
        return this.data.shareData
    },
    data: {
        savedFilePath: '',
        poetry: '笑颜如花绽，玉音婉转流',
        dialog: {
            hidden: true
        },
        shareData: {
            title: '帮我打个分呗？',
            desc: '投我以木瓜，报之以琼琚。匪报也，永以为好也！',
            path: '/pages/picture/pages/share/share?id="123"'
        }
    },
    chooseImage: function () {
        var that = this
        wx.chooseImage({
            count: 1,
            success: function (res) {
                that.saveFile(res.tempFilePaths[0]);
            }
        })
    },
    saveFile: function (tempFilepath) {
        var that = this
        wx.saveFile({
            tempFilePath: tempFilepath,
            success: function (res) {
                that.setData({
                    savedFilePath: res.savedFilePath
                })
                wx.setStorageSync('savedFilePath', res.savedFilePath);
            },
            fail: function (res) {
                that.setData({
                    dialog: {
                        title: '保存失败',
                        content: '应该是有 bug 吧',
                        hidden: false
                    }
                })
            }
        })
    },
    sharePage: function () {
        wx.navigateTo({
            url: '/pages/picture/pages/share/share?id="123"'
        })
    }
})
