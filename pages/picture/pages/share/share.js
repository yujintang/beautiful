Page({
  onLoad: function () {
    this.setData({
      savedFilePath: wx.getStorageSync('savedFilePath') || '../../../image/camera.png'
    })
  },
  onShareAppMessage: function () {
    return this.data.shareData
  },
  data: {
    savedFilePath: '',
    poetry: '笑颜如花绽，玉音婉转流',
    placeholder: '输入点什么吧～',
    inputValue: '',
    dialog: {
      hidden: true
    },
    shareData: {
      title: '帮我打个分呗？',
      desc: '投我以木瓜，报之以琼琚。匪报也，永以为好也！',
      path: '/pages/picture/pages/share/share?id=100'
    },
    barrageList: [],
    barrageOpen:{
          display: 'inline',
          image: '/image/barrage_open.png'
      },
    barrageClose:{
          display: 'none',
          image: '/image/barrage_close.png'
      },
    barrageDefault:{
        display: 'inline',
        image: '/image/barrage_open.png'
    },
    flag: 0,
  },
  changeName: function (e) {
    temp.push(new barrage(e.detail.value, Math.ceil(Math.random() * 84), Math.ceil(Math.random() * 10) + 2, getRandomColor()))
    this.setData({
      inputValue: '',
      barrageList: temp
    });
  },
  changeBarrageImage: function () {
      let flag = (this.data.flag + 1 ) % 2;
      let barrageDefault = void 0;
      let that = this;
      switch (flag){
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
class barrage {
  constructor(text, top, time, color) {
    this.text = text;
    this.top = top;
    this.time = time;
    this.color = color;
    this.display = true;
    this.id = 'a' + Math.random() * 1000
  }
}
function getRandomColor() {
  let rgb = [];
  for (let i = 0; i < 3; i++) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
