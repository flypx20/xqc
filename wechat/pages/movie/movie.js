// pages/movie/movie.js
var app = getApp();
var { getMovieListData } = require('../../utils/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /** 
    var _this = this;
    wx.request({
      url: "http://t.yushu.im/v2/movie/in_theaters?start=0&count=3", //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // success(_this.formatData(res.data))
        console.log(res)
      }
    })
    */
    var _this = this;
    var baseUrl = app.G_DATA.baseUrl;
    var inTheatersUrl = baseUrl + "in_theaters?start=0&count=3";
    var comingSoonUrl = baseUrl + "coming_soon?start=0&count=3";
    var top250Url = baseUrl + "top250?start=0&count=3";
    // console.log(baseUrl)
    getMovieListData(inTheatersUrl, function (data) {
      // console.log(data)
      _this.setData({
        inTheatersData: data,
        inTheatersTag: "正在热映",
        inTheatersTagType: "inTheaters"
      })
    });
    getMovieListData(comingSoonUrl, function (data) {
      // console.log(data)
      _this.setData({
        comingSoonData: data,
        comingSoonTag: "即将上映",
        comingSoonTagType: "comingSoon"
      })
    });
    getMovieListData(top250Url, function (data) {
      // console.log(data)
      _this.setData({
        top250Data: data,
        top250Tag: "豆瓣Top250",
        top250TagType: "top250"
      })
    });
  },

  tapMore: function(event){
    // console.log(event)
    var tapType = event.currentTarget.dataset.tagType;
    // console.log(tapType)
    // console.log("aa")
    wx.navigateTo({
      url: 'movie-more/movie-more?tagType=' + tapType
    })
  }

})
