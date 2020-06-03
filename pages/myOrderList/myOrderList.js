// pages/myOrderList/myOrderList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    myOrder:[],
    otherOrder:[],
    height:'',
    static:{
      0:'待接单',
      1:'正在路上',
      2:'已送达',
      3:'取消订单',
      4:'交易完成'
    }
  },
  myOrderDetail:function(a){
    wx.redirectTo({
      url: '../myOrder/myOrder?'+a.currentTarget.id,
    })
  },
  ortherOrderDetail: function (a) {
    wx.redirectTo({
      url: '../ortherOrder/ortherOrder?' + a.currentTarget.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var myOrder = '',otherOrder = '';
    wx.request({
      url: 'http://47.107.137.51:8002/indent/getIndentList',
      type:'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data:{
        userId:wx.getStorageSync('user')
      },
      success(res){
        myOrder = res.data.data
        wx.request({
          url: 'http://47.107.137.51:8002/userIndentRelation/getAllRevicerIndent',
          type: 'GET',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          data: {
            userId: wx.getStorageSync('user')
          },
          success(res) {
            otherOrder = res.data.data
            if (myOrder.length > otherOrder.length) {
              that.setData({
                height: myOrder.length * 195 + 'px',
                myOrder: myOrder,
                otherOrder: otherOrder
              })
            } else {
              that.setData({
                height: otherOrder.length * 195 + 'px',
                myOrder: myOrder,
                otherOrder: otherOrder
              })
            }
          }
        })
      }
    })
    
    
  },
  switchNav:function(e){
    var id = e.currentTarget.id;
    this.setData({
      currentTab:id
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.data)
    console.log(this.data.myOrder.length)
    
    console.log(this.data.height)
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