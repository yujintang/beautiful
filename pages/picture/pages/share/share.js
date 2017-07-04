Page({
    onLoad: function () {
        this.setData({
            savedFilePath: wx.getStorageSync('savedFilePath') || '../../image/8ea99a317e1ec430207b11db053290cb.png'
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
            path: '/pages/picture/pages/share/share?id=100'
        }
    }
});
