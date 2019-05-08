//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),

    // tabbar
    tabbar: {},

    // 自定义滚动
    colors: [],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // 底部
    app.editTabbar();
    // 滚动
    const colors = this._generateColors(20);
    this.setData({ colors });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },


  _randomColor: function () {
    return `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${(Math.random() * 0.3 + 0.2).toFixed(1)})`;
  },

  _generateColors: function (length) {
    return new Array(length).fill(null).map(() => this._randomColor());
  },

  //下拉刷新监听函数
  _onPullDownRefresh: function () {
    setTimeout(() => {
      const colors = this._generateColors(20);
      this.setData({
        colors,
        refreshing: false,
      });
    }, 2000);
  },

  //加载更多监听函数
  _onLoadmore: function () {
    setTimeout(() => {
      if (this.data.colors.length == 80) {
        this.setData({ nomore: true })
      } else {
        const colors = this._generateColors(20);
        this.setData({ colors: [...this.data.colors, ...colors] });
      }
    }, 1000);
  },

  _onScroll: function (e) {
    console.log(e);
  }




})
