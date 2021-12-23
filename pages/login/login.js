// pages/login/login.js
import myResponse from '../../utils/myResponse'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 电话号码
        phoneNumer: '',
        // 密码
        passWorld: '',
        // 登录成功后返回的用户信息

    },

    // 实时获取手机号
    getPhoneNumber(e) {
        this.setData({
            "phoneNumer": e.detail.value
        })
    },

    // 实时获取密码
    getPass(e) {
        this.setData({
            "passWorld": e.detail.value
        })
    },

    // 点击手机登录
    async phoneLog() {
        wx.showToast({
            title: '请等待',
            icon: 'loading',
            mask: true,
            duration: 50000
        })

        let state = await myResponse('/login/cellphone', {
            "phone": this.data.phoneNumer,
            "password": this.data.passWorld
        })

        if(state.cookies.length === 0){
            wx.showToast({
                title: '登录频繁',
                icon: 'error',
                mask: true
            })
            return
        }

        for (let i = 0; i < state.cookies.length; i++) {
           if(state.cookies[i].indexOf('MUSIC_U') !== -1){
            wx.setStorageSync('cookieIndex', i)
           }
        }

        wx.setStorageSync('cookie', state.cookies)
        wx.setStorageSync('token', state.data.token)
        wx.setStorageSync('userMess', JSON.stringify(state.data.profile))

        if (state.data.code === 200) {
            wx.showToast({
                title: '登陆成功',
                icon: 'success',
                mask: true
            })
            wx.switchTab({
              url: '../index/index',
            })
        } else if (state.data.code === 502) {
            wx.showToast({
                title: '密码错误',
                icon: 'error',
                mask: true
            })
        } else if (state.data.code === 501) {
            wx.showToast({
                title: '账户不存在',
                icon: 'error',
                mask: true
            })
        } else {
            wx.showToast({
                title: '登陆失败',
                icon: 'error',
                mask: true
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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