//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //隐藏系统tabbar
    this.hidetabbar();
    //获取设备信息
    this.getSystemInfo();


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function() {
    // 隱藏系統tabbar
    this.hidetabbar();
  },

  hidetabbar: function () {
    wx.hideTabBar({
      fail: function () {
        setTimeout(function() {
          wx.hideTabBar();
        }, 500)
      }
    })
  },
  getSystemInfo: function() {
    let t = this;
    wx.getSystemInfo({
      success: function(res) {
        t.globalData.systemInfo = res;
      }
    })
  },
  editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  }, 
  globalData: {
    systemInfo: null, //客户端设备信息
    userInfo: null,
    tabBar: {
      'backgroundColor': '#fff',
      'color': '#929292',
      'selectedColor': '#f85657',
      'list': [{
        'pagePath': '/pages/index/index',
        'iconPath': 'icon/ico9.png',
        'selectedIconPath': 'icon/ico10.png',
        'text': '首页'
      }, {
        'pagePath': '/pages/code/code',
        'iconPath': 'icon/ico11.png',
        'selectedIconPath': 'icon/ico11.png',
        'isSpecial': true,
        'text': '会员码'
      }, {
        'pagePath': '/pages/member/member',
        'iconPath': 'icon/ico12.png',
        'selectedIconPath': 'icon/ico13.png',
        'text': '我的'
      }]
    }
  }
})