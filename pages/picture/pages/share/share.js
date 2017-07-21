var app = getApp(),
  config = app.config;
Page({
    onLoad: function (options) {
        var that = this
        wx.request({
            url: config.Url.findShare,
            data: {
                _id: options._id
            },
            success: function (res) {
                if (res.data.code === 1) {
                    let data = res.data.content
                    that.setData({
                        shareId: data._id,
                        poetry: data.poetry,
                        savedFilePath: data.image,
                        shareData:{
                            path: '/pages/picture/pages/share/share?id=' + options._id
                        }
                    })
                }
            }
        })
        wx.request({
            url: config.Url.commentList,
            data: {
                shareId: options._id,
                limit: 20,
                skip: 0
            },
            success: function (res) {
                if(res.data.code === 1){
                    that.setData({
                        barrageList: res.data.content
                    })
                }
                console.log('ss')
            }
        })
    },
    onShareAppMessage: function () {
        return this.data.shareData
    },
    data: {
        savedFilePath: config.Base.baseShareImage,
        poetry: '笑颜如花绽，玉音婉转流',
        placeholder: '输入点什么吧～',
        inputValue: '',
        shareId: '',
        dialog: {
            hidden: true
        },
        shareData: {
            title: '帮我打个分呗？',
            desc: '投我以木瓜，报之以琼琚。匪报也，永以为好也！',
            path: '/pages/picture/pages/share/share?id='
        },
        barrageList: [],
        barrageOpen: {
            display: 'inline',
            image: '/image/barrage_open.png'
        },
        barrageClose: {
            display: 'none',
            image: '/image/barrage_close.png'
        },
        barrageDefault: {
            display: 'inline',
            image: '/image/barrage_open.png'
        },
        flag: 0,
    },
    submitComment: function (e) {
        var that = this
        let entity = {
            author: app.globalData.userInfo,
            sessionId: app.globalData.sessionId,
            shareId: that.data.shareId,
            comment: e.detail.value,
            desc: {
                top: Math.ceil(Math.random() * 84),
                time: Math.ceil(Math.random() * 10) + 2,
                color: getRandomColor(),
            }
        };
        wx.request({
            url: config.Url.saveComment,
            method: 'POST',
            data: entity,
            success: function (res) {
                if(res.data.code === 1){
                    temp.push(res.data.content)
                    that.setData({
                        inputValue: '',
                        barrageList: temp
                    });
                }
            }
        });
    },
    changeBarrageImage: function () {
        let flag = (this.data.flag + 1 ) % 2;
        let barrageDefault = void 0;
        let that = this;
        switch (flag) {
            case 1:
                barrageDefault = that.data.barrageClose
                break;
            default:
                barrageDefault = that.data.barrageOpen
                break;
        }
        this.setData({
            barrageDefault: barrageDefault,
            flag: flag
        })
    }
});
let temp = [];

function getRandomColor() {
    let rgb = [];
    for (let i = 0; i < 3; i++) {
        let color = Math.floor(Math.random() * 256).toString(16)
        color = color.length == 1 ? '0' + color : color
        rgb.push(color)
    }
    return '#' + rgb.join('')
}
