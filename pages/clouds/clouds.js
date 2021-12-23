// pages/clouds/clouds.js
import myResponse from '../../utils/myResponse'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 视频列表数据
        videoList: [],
        // 点击图片的id
        tapImg:''
    },

    // 获取视频列表数据
    async getVedioList() {
        let videoList = await myResponse('/video/timeline/recommend')
        this.setData({
            'videoList':videoList.data.datas
        })
    },

    // 点击图片播放视频
    playVideo(e){  
        this.setData({
            "tapImg":e.currentTarget.dataset.wid
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getVedioList()
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
        this.getVedioList()
        wx.stopPullDownRefresh()
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