// pages/custom-tab-bar/index.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      value: {
        backgroundColor: '#fff',
        color: '#979795',
        selectedColor: '#1c1c1b',
        list: [{
          pagePath: 'pages/index/index',
          iconPath: '../images/ico9.png',
          selectedIconPath: '../images/ico10.png',
          text: '首页'
        }, {
          pagePath: 'pages/code/code',
          iconPath: '../images/ico11.png',
          isSpecial: true,
          text: '会员码'
        }, {
          pagePath: 'pages/member/member',
          iconPath: '../images/ico12.png',
          selectedIconPath: '../images/ico13.png',
          text: '我的'
        }]
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIphoneX: app.globalData.systemInfo.model.includes('iphone X')
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})