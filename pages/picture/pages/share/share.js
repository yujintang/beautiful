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
    barrageDisplay:'inline',
  },
  changeName: function (e) {
    temp.push(new barrage(e.detail.value, Math.ceil(Math.random() * 84), Math.ceil(Math.random() * 5) + 2, getRandomColor()))
    this.setData({
      inputValue: '',
      barrageList: temp
    })
    console.log(this.data.barrageList)
  },
});
let temp = [];
class barrage {
  constructor(text, top, time, color) {
    this.text = text;
    this.top = top;
    this.time = time;
    this.color = color;
    this.display = true;
    let that = this;
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
