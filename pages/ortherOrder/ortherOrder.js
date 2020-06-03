// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    identId: '',
    data: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var data = {
      indentId: options.indentId
    }
    this.setData({
      identId: options.indentId
    })
    wx.request({
      url: 'http://47.107.137.51:8002/indent/indentDetail',
      method: 'GET',
      data: data,
      success(res) {
        that.setData({
          data: res.data.data
        })
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.data)
  },
  getIt: function () {
    var that = this
    console.log(this.data)
    wx.request({
      url: 'http://47.107.137.51:8002/indent/indentArrived',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        indentId: that.data.identId
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: '确认送达',
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../myOrderList/myOrderList',
            })
          }, 1000)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  cancelIt: function () {
    var that = this
    console.log(that.data)
    wx.request({
      url: 'http://47.107.137.51:8002/userIndentRelation/deleteUserIndentRelationById',
      method: 'DELETE',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        indentId: that.data.identId
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: '取消成功',
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../myOrderList/myOrderList',
            })
          }, 1000)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
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