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
        color: '#929292',
        selectedColor: '#f85657',
        list: [{
          pagePath: '/pages/index/index',
          iconPath: 'icon/ico9.png',
          selectedIconPath: 'icon/ico10.png',
          text: '首页'
        }, {
          pagePath: '/pages/code/code',
          iconPath: 'icon/ico11.png',
          isSpecial: true,
          text: '会员码'
        }, {
          pagePath: '/pages/member/member',
          iconPath: 'icon/ico12.png',
          selectedIconPath: 'icon/ico13.png',
          text: '我的'
        }]
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIphoneX: app.globalData.systemInfo.model.includes('iPhone X')
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})