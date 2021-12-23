// pages/playList/playList.js
import myResponse from '../../utils/myResponse'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 推荐的歌单
        recommendPlayList: []
    },

    // 获取每日推荐歌单
    async getDayRecommendPlayList() {
        let recommendPlayListMes = await myResponse('/recommend/resource')
        this.setData({
            "recommendPlayList": recommendPlayListMes.data.recommend
        })
    },

    // 点击歌单项跳转到歌单详情页面
    JumpDetails(e) {
        // console.log(e.currentTarget.dataset.mid)
        wx.navigateTo({
            url: `/pages/songListDetails/songListDetails?mid=${e.currentTarget.dataset.mid}`,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getDayRecommendPlayList()
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