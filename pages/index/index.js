// pages/index/index.js
import myResponse from '../../utils/myResponse'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 轮播图数据
        bannerList: [],
        // 导航条数据
        navList: [{
                icon: 'iconfont icon-meirituijian',
                title: '每日推荐',
                url: '/pages/recommendedDaily/recommendedDaily'
            },
            {
                icon: 'iconfont icon-gedan',
                title: '歌单',
                url: '/pages/playList/playList'
            },
            {
                icon: 'iconfont icon-paihangbang',
                title: '排行榜',
                url: '/pages/rankingList/rankingList'
            }
        ],
        // 推荐的歌单
        recommendPlayList: [],
        // 推荐歌曲
        recommendMusic: [],
        songListId: []
    },

    // 导航条点击切换页面
    switchTab(e) {

        wx.navigateTo({
            url: e.currentTarget.dataset.src,
        })
    },

    // 获取轮播图数据
    async getBanner() {
        let data = await myResponse('/banner', {
            "type": 1
        })
        this.setData({
            "bannerList": data.data.banners
        })
    },

    // 获取每日推荐歌单
    async getDayRecommendPlayList() {
        let recommendPlayListMes = await myResponse('/recommend/resource')
        this.setData({
            "recommendPlayList": recommendPlayListMes.data.recommend
        })
    },

    // 获取每日推荐歌曲
    async getDayRecommendMusic() {
        let recommendMusicMes = await myResponse('/recommend/songs')

        let songListId = []
        for (let i = 0; i < recommendMusicMes.data.data.dailySongs.length; i++) {
            songListId.push(recommendMusicMes.data.data.dailySongs[i].id)
        }

        this.setData({
            "recommendMusic": recommendMusicMes.data.data.dailySongs,
            'songListId': songListId
        })
    },

    // 点击歌单项跳转到歌单详情页面
    JumpDetails(e) {
        // console.log(e.currentTarget.dataset.mid)
        wx.navigateTo({
            url: `/pages/songListDetails/songListDetails?mid=${e.currentTarget.dataset.mid}`,
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
        if (wx.getStorageSync('cookie') && wx.getStorageSync('token') && wx.getStorageSync('userMess')) {
            this.getBanner()
            this.getDayRecommendPlayList()
            this.getDayRecommendMusic()
        } else {
            wx.redirectTo({
                url: '../login/login',
            })
        }

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