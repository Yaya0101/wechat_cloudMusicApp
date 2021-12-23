// pages/mine/mine.js
import myResponse from '../../utils/myResponse'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 判断用户是否登录的信息
        isLogin: false,
        // 用户基本信息
        userMess: {},
        // 最近播放的歌曲
        userRecentPlay: [],
        // 我喜欢的音乐
        myLikeMusic: [],
        // 喜欢音乐背景图片
        myLikeMusicPic: '',
        // 收藏歌单列表数据
        playlist: [],
        // 喜欢的音乐详情列表
        favoriteMusicDetails: [],
        songListId: []
    },

    // 判断用户是否登录
    getUserIsLogin() {
        if (wx.getStorageSync('cookie') && wx.getStorageSync('token') && wx.getStorageSync('userMess')) {
            this.setData({
                "isLogin": true,
                "userMess": JSON.parse(wx.getStorageSync('userMess'))
            })
        }
    },

    // 点击登录跳转到登录页面
    toLogin() {
        wx.redirectTo({
            url: '../login/login',
        })
    },

    // 获取最近播放歌曲
    async getRecentPlay() {
        let recentPlayList = await myResponse('/user/record', {
            'uid': this.data.userMess.userId,
            'type': 1
        })

        let songListId = []
        for (let i = 0; i < recentPlayList.data.weekData.length; i++) {
            songListId.push(recentPlayList.data.weekData[i].song.id)
        }

        this.setData({
            'userRecentPlay': recentPlayList.data.weekData,
            'songListId':songListId
        })
    },

    // 获取用户喜欢的音乐列表
    async getUserLikeMusic() {
        let likeMusicList = await myResponse('/likelist', {
            "uid": this.data.userMess.userId
        })
        this.setData({
            'myLikeMusic': likeMusicList.data.ids
        })

        let musicMess = await myResponse('/song/detail', {
            "ids": this.data.myLikeMusic[0]
        })
        this.setData({
            "myLikeMusicPic": musicMess.data.songs[0].al.picUrl
        })

        let ids = ''
        for (let i = 0; i < this.data.myLikeMusic.length; i++) {
            if (i === this.data.myLikeMusic.length - 1) {
                ids = ids + (this.data.myLikeMusic[i])
            } else {
                ids = ids + (this.data.myLikeMusic[i] + ',')
            }

        }
        let songListData = await myResponse('/song/detail', {
            "ids": ids
        })

        this.setData({
            "favoriteMusicDetails": songListData.data.songs
        })
    },

    // 获取用户收藏的歌单列表
    async getUserPlaylist() {
        let UserPlaylist = await myResponse('/user/playlist', {
            "uid": this.data.userMess.userId
        })
        for (let i = 0; i < UserPlaylist.data.playlist.length; i++) {
            if (UserPlaylist.data.playlist[i].subscribed === false) {
                UserPlaylist.data.playlist.splice(i, 1)
                i--
            }
        }
        this.setData({
            "playlist": UserPlaylist.data.playlist
        })
    },

    // 点击歌单项跳转到歌单详情页面
    JumpDetails(e) {
        // console.log(e.currentTarget.dataset.mid)
        wx.navigateTo({
            url: `/pages/songListDetails/songListDetails?mid=${e.currentTarget.dataset.mid}`,
        })
    },

    // 跳转到喜欢音乐的页面
    toLikeMusicPage() {
        let favoriteMusicDetails = this.data.favoriteMusicDetails
        wx.navigateTo({
            url: '../favoriteMusicg/favoriteMusicg',
            success: function (res) {
                // 通过eventChannel向被打开页面传送数据
                res.eventChannel.emit('likeMusic', {
                    data: favoriteMusicDetails
                })
            }
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
        this.getUserIsLogin()
        if (this.data.isLogin) {
            this.getRecentPlay()
            this.getUserLikeMusic()
            this.getUserPlaylist()
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