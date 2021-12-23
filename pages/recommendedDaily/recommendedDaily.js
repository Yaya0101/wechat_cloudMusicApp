// pages/recommendedDaily/recommendedDaily.js
import myResponse from '../../utils/myResponse'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        songList: [],
        songListId: []
    },

    // 获取音乐列表
    async getSonglist() {
        let songList = await myResponse('/recommend/songs')

        let songListId = []
        for (let i = 0; i < songList.data.data.dailySongs.length; i++) {
            songListId.push(songList.data.data.dailySongs[i].id)
        }

        this.setData({
            'songList': songList.data.data.dailySongs,
            'songListId': songListId
        })
    },

    // 跳转到播放器
    toPlayer(e) {
        let songListId = this.data.songListId
        wx.navigateTo({
            url: `../player/player?mid=${e.currentTarget.dataset.mid}&mindex=${e.currentTarget.dataset.mindex}`,
            success: function (res) {
                // 通过eventChannel向被打开页面传送数据
                res.eventChannel.emit('songListId', {
                    data: songListId
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getSonglist()
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