// 工具函数

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds();


  return [year, month, day].map(formatNumber).join('.') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 将一维数组转为二维数组
function listToMatrix(list, elementPerSubArray) {
  let matrix = [], i, k;

  for (i = 0, k = -1; i < list.length; i += 1) {
    if (i % elementPerSubArray === 0) {
      k += 1;
      matrix[k] = [];
    }

    matrix[k].push(list[i]);
  }

  return matrix;
}

/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs(pageObj) {
  var url = pageObj.route    //当前页面url
  var options = pageObj.options    //如果要获取url中所带的参数可以查看options

  //拼接url的参数
  var urlWithArgs = url + '?'
  for (var key in options) {
  var value = options[key]
  urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

  return urlWithArgs
}

module.exports = {
  formatTime: formatTime,
  listToMatrix: listToMatrix,
  getCurrentPageUrlWithArgs: getCurrentPageUrlWithArgs,
}
