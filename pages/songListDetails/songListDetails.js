// pages/songListDetails/songListDetails.js
import myResponse from "../../utils/myResponse"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        clickId: 0,
        songList: [],
        coverImgUrl:''
    },

    // 获取歌单详情数据
    async getSongListDetails() {
        let songListDetails = await myResponse('/playlist/detail', {
            "id": this.data.clickId
        })
        this.setData({
            "coverImgUrl":songListDetails.data.playlist.coverImgUrl,
            "songList": songListDetails.data.playlist.tracks
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            'clickId': options.mid
        })

        this.getSongListDetails()
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