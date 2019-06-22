var { articles } = require('../../../data/db.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var articleId = options.articleId;
    this.data.articleId = articleId;
    // 设置文章详细内容
    var article = articles[articleId];
    // console.log(article)
    this.setData(article);
    /** 
     * 设置收藏状态
      {
        "0":false,
        "1":true
      }
    */
    // 设置收藏状态
    var articlesCollection = wx.getStorageSync("articles_collection");
    var currentIsCollected = false;
    if (articlesCollection){
      currentIsCollected = !!articlesCollection[articleId];
    }else{
      var data = {};
      data[articleId] = false;
      wx.setStorageSync("articles_collection", data);
    }
    this.setData({
      currentIsCollected: currentIsCollected
    })

    // 监听音乐播放
    var _this = this;
    var backgroundAudioManager = wx.getBackgroundAudioManager();
    backgroundAudioManager.onPlay(function(){
      _this.setData({
        isPlayingMusic: true
      })
    });
    backgroundAudioManager.onPause(function () {
      _this.setData({
        isPlayingMusic: false
      })
    })

  },
  /**
   * 处理图片
   */
  tapCollection: function () {
    var _this = this;
    /**
     *处理收藏
    wx.setStorageSync("articles_collection",{
      name:"aa"
    })
    wx.setStorageSync(key, data)
    */
    // console.log(wx.getStorageSync("articles_collection"));
    // wx.removeStorageSync("articles_collection")
    // wx.clearStorageSync();
    var articlesCollection = wx.getStorageSync("articles_collection");
    var currentIsCollected = articlesCollection[this.data.articleId];

    // 改变storage里面的值
    articlesCollection[this.data.articleId] = !currentIsCollected;
    wx.setStorageSync("articles_collection", articlesCollection);

    // 改变页面图片显示
    this.setData({
      currentIsCollected: !currentIsCollected
    })
    wx.showToast({
      title: currentIsCollected ? '取消成功' : '收藏成功',
    })
    /** 
    wx.showModal({
      title: currentIsCollected ? '添加收藏' : '取消收藏',
      success: function(res){
        if(res.confirm){
          // 改变storage里面的值
          articlesCollection[_this.data.articleId] = !currentIsCollected;
          wx.setStorageSync("articles_collection", articlesCollection);

          // 改变页面图片显示
          _this.setData({
            currentIsCollected: !currentIsCollected
          })
        }
      }
    })
    */
  },
  /**
   * 处理分享
   */
  tapShare: function(){
    var itemList = ["分享至微信", "分享至微博","分享至QQ"];
    wx.showActionSheet({
      itemList: itemList,
      success: function(res){
        // console.log(res.tapIndex)
        wx.showToast({
          title: itemList[res.tapIndex] + "成功",
        })
      }
    })
  },
  /**
   * 处理音乐
   */
  tapMusic: function(){
    /**
     * 第一种
      var backgroundAudioManager = wx.getBackgroundAudioManager();
      backgroundAudioManager.src = "http://oxoxtpvtn.bkt.clouddn.com/%E9%87%91%E5%BF%97%E6%96%87%20-%20%E4%B8%BA%E7%88%B1%E7%97%B4%E7%8B%82.mp3";
      backgroundAudioManager.title = "为爱痴狂";
      backgroundAudioManager.coverImgUrl = "http://oxoxtpvtn.bkt.clouddn.com/%E4%B8%BA%E7%88%B1%E7%97%B4%E7%8B%82.jpg";

      var isPlayingMusic = this.data.isPlayingMusic;
      if(isPlayingMusic){
        this.setData({
          isPlayingMusic: false
        }, function () {
          backgroundAudioManager.pause();
        })
      }else{
        this.setData({
          isPlayingMusic: true
        }, function () {
          backgroundAudioManager.play();
        })
      }
     */
    var backgroundAudioManager = wx.getBackgroundAudioManager();
    var isPlayingMusic = this.data.isPlayingMusic;
    if(isPlayingMusic){
      backgroundAudioManager.pause();
      this.setData({
        isPlayingMusic: false
      })
    }else{
      backgroundAudioManager.src = this.data.music.src;
      backgroundAudioManager.title = this.data.music.title;
      backgroundAudioManager.coverImgUrl = this.data.music.coverImgUrl;
      this.setData({
        isPlayingMusic: true
      })
    } 
  }
  
})