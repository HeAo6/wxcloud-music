// pages/playlist/playlist.js
const MAX_LIMIT = 15
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperImgUrls: [
            {
                url: 'http://p1.music.126.net/oeH9rlBAj3UNkhOmfog8Hw==/109951164169407335.jpg',
          },
          {
                url: 'http://p1.music.126.net/xhWAaHI-SIYP8ZMzL9NOqg==/109951164167032995.jpg',
          },
          {
                url: 'http://p1.music.126.net/Yo-FjrJTQ9clkDkuUCTtUg==/109951164169441928.jpg',
          }
        ],
        playlist:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this._getPlatlist()
      
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
      //首先把数据清空
      this.setData({
        playlist:[]
      })
      this._getPlatlist()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
      this._getPlatlist()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
    },
    _getPlatlist(){
      wx.showLoading({
        title: '加载中...',
      })
      wx.cloud.callFunction({
        name:'music',
        data:{
          start: this.data.playlist.length,
          count: MAX_LIMIT,
          $url : 'playlist'
        },
        
      }).then((res)=>{
        this.setData({
          playlist:this.data.playlist.concat(res.result)
        })
        
        wx.hideLoading()  //数据显示后隐藏提示文字
        wx.stopPullDownRefresh() //数据请求成功后暂停下拉刷新，
      })
    }
})