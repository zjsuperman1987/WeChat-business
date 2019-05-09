//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 页面结构
    pageComponent: [{
      name: 'header'
    }, {
      name: 'navList'
    }, {
      name: 'customerActiveTitle'
    }, {
      name: 'customerActiveList'
    }],

    // tabbar
    tabbar: {},

    // 自定义滚动
    // colors: [],

    // swiper
    imgUrls: [
      'http://a2.qpic.cn/psb?/V12oEYDD0Tk57U/6jyPOaocChuK9pKJ5FfT0WL0KD3QGsHd73fbL4GS2Yo!/m/dDUBAAAAAAAAnull&bo=nwI8AQAAAAADB4I!&rf=photolist&t=5',
      'http://a2.qpic.cn/psb?/V12oEYDD0Tk57U/6jyPOaocChuK9pKJ5FfT0WL0KD3QGsHd73fbL4GS2Yo!/m/dDUBAAAAAAAAnull&bo=nwI8AQAAAAADB4I!&rf=photolist&t=5',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular: true,
    indicator_color: '#fff',
    indicator_active_color: '#f85859'	
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    // 底部
    app.editTabbar();

    // 滚动
    const colors = this._generateColors(20);
    this.setData({
      colors
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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


  _randomColor: function() {
    return `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${(Math.random() * 0.3 + 0.2).toFixed(1)})`;
  },

  _generateColors: function(length) {
    return new Array(length).fill(null).map(() => this._randomColor());
  },

  //下拉刷新监听函数
  _onPullDownRefresh: function() {
    setTimeout(() => {
      const colors = this._generateColors(20);
      this.setData({
        colors,
        refreshing: false,
      });
    }, 2000);
  },

  //加载更多监听函数
  _onLoadmore: function() {
    setTimeout(() => {
      if (this.data.colors.length == 80) {
        this.setData({
          nomore: true
        })
      } else {
        const colors = this._generateColors(20);
        this.setData({
          colors: [...this.data.colors, ...colors]
        });
      }
    }, 1000);
  },

  _onScroll: function(e) {
    console.log(e);

  },


  // swiper
  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  }

})