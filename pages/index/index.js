// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[]
  },
  orderDetail:function(a){
    var url = '../order/order?' + a.currentTarget.id
    console.log(url)
    wx.redirectTo({
      url: url
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://47.107.137.51:8002/indent/getIndentList',
      method: 'GET',
      data: {
        status: 0
      },
      success: function (res) {
        console.log(res)
        that.setData({
          orders: res.data.data
        })
      }
    })
    console.log(this.data)
    if (wx.getStorageSync("user") == '') {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(function () {
        wx.redirectTo({
          url: '../login/login',
        })
      }, 1500)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      orders : []
      })
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this;
    wx.request({
      url: 'http://47.107.137.51:8002/indent/getIndentList',
      method: 'GET',
      data: {
        status: 0
      },
      success: function (res) {
        console.log(res)
        that.setData({
          orders: res.data.data
        })
      }
    })
    //模拟加载

    setTimeout(function () {

      // complete

      wx.hideNavigationBarLoading() //完成停止加载

      wx.stopPullDownRefresh() //停止下拉刷新

    }, 1500);

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})