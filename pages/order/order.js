// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    identId:'',
    data:[]
  },
  doIt:function(){
    var data = {
      userId:wx.getStorageSync('user'),
      indentId:this.data.indentId
    }
    wx.request({
      url: 'http://47.107.137.51:8002/userIndentRelation/insertUserIndentRelation',
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data:data,
      success:function(res){
        if(res.data.code == 200){
          wx.showToast({
            title: '接单成功',
          })
          setTimeout(function(){
            wx.switchTab({
              url: '../index/index',
            })
          },1000)
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
        }
      }
    })
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
      indentId:options.indentId
    })
    wx.request({
      url: 'http://47.107.137.51:8002/indent/indentDetail',
      method:'GET',
      data:data,
      success(res){
        that.setData({
          data : res.data.data
        })
        console.log(res)
      }
    })
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