function coverStarsToArray(stars){
  var arr = [];
  var num = stars.toString().substring(0,1);
  for(var i = 1; i <= 5; i++){
    if(i <= num){
      arr.push(1);
    }else{
      arr.push(0)
    }
  }
  return arr;
}

function formatData(data) {
  var arr = [];
  for (var i = 0; i < data.subjects.length; i++) {
    arr.push({
      coverImg: data.subjects[i].images.large,
      title: data.subjects[i].title,
      stars: coverStarsToArray(data.subjects[i].rating.stars),
      score: data.subjects[i].rating.average
    })
  }
  return arr;

  // [1,1,1,0,0]
}

function getMovieListData(url, success) {
  wx.request({
    url: url, //仅为示例，并非真实的接口地址
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      success(formatData(res.data))
    }
  })
}
module.exports = {
  coverStarsToArray: coverStarsToArray,
  getMovieListData: getMovieListData
}