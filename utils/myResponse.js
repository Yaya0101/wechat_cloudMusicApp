import config from '../utils/config.js'
export default (url, data = {}, method = "GET") => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      data,
      method,
      header: {
        'cookie': wx.getStorageSync('cookie') ? wx.getStorageSync('cookie')[wx.getStorageSync('cookieIndex')] : ''
      },
      success: (res) => {
        //使用promise后,成功回调返回的值
        resolve(res)
      },
      fail: (err) => {
        //使用promise后,失败回调返回的值
        reject(err)
      }
    })
  })
}