var db = require('../../data/db.js')

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
    /*
    var articles = [
      {
        avatar: "/images/avatar/avatar.jpg",
        date: "2018-09-20",
        title: "标题",
        image: "/images/yyqx/2.jpg",
        desc: "神马啊",
        like: "20",
        view: "99"
      },
      {
        avatar: "/images/avatar/3.jpg",
        date: "2018-09-21",
        title: "标题",
        image: "/images/yyqx/1.jpg",
        desc: "真好看",
        like: "29",
        view: "101"
      }
    ];
    // this.data.articles = articles;
    var _this = this;
    this.setData({
      articles: articles
    },function(){
      console.log(_this.data)
    })
    */
    this.setData({
      articles: db.articles
    })
  },
  /*
    跳转到详情页面
  */
  tapArticleItem: function(event){
    // console.log(event)
    var articleId = event.currentTarget.dataset.articleId;
    wx.navigateTo({
      url: 'article-detail/article-detail?articleId=' + articleId
    })
  }
 
})