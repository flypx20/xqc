// pages/movie/movie-more/movie-more.js
var { getMovieListData } = require('../../../utils/utils.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestUrl: "",
    totalCount: 0,
    totalMovies: [],
    isEnd: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // console.log(options)
    // console.log(Page.getData)
    // var tagType = options.tagType;
    // console.log(tagType)
    var baseUrl = app.G_DATA.baseUrl;
    var _this = this;
    var requestUrl = "";
    var title = ""
    switch (options.tagType) {
      case "inTheaters":
        requestUrl = baseUrl + "in_theaters";
        title = "正在热映";
        break;
      case "comingSoon":
        requestUrl = baseUrl + "coming_soon";
        title = "即将上映";
        break;
      case "top250":
        requestUrl = baseUrl + "top250";
        title = "豆瓣Top250";
        break;
    }
    wx.setNavigationBarTitle({
      title: title
    })
    this.data.requestUrl = requestUrl;
    wx.showNavigationBarLoading();
    getMovieListData(requestUrl +'?start=0&count=20', this.handleMovieList)
  },
  handleMovieList: function(data){
    var _this = this;
    if(data.length == 0){
      this.data.isEnd = true;
      wx.showToast({
        title: '已经没有数据了'
      })
      wx.hideNavigationBarLoading();
      return;
    }
    this.data.totalCount += data.length;
    this.data.totalMovies = this.data.totalMovies.concat(data);
    _this.setData({
      movies: this.data.totalMovies
    })
    wx.hideNavigationBarLoading();
    // console.log(this.data.totalMovies)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   * 刷新
   */
  onPullDownRefresh: function () {
    var _this = this;
    wx.showNavigationBarLoading();
    getMovieListData(this.data.requestUrl, function(data){
      _this.setData({
        movies: data
      })
      wx.hideNavigationBarLoading();
      return;
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   * 加载更多
   */
  onReachBottom: function (data) {
    // console.log(data)
    if (this.data.isEnd) {
      wx.showToast({
        title: '已经没有数据了'
      })
      return;
    }
    wx.showNavigationBarLoading();
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    getMovieListData(nextUrl, this.handleMovieList)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})