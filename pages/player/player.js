// pages/player/player.js
import myResponse from "../../utils/myResponse"

let BackgroundAudioManager = wx.getBackgroundAudioManager()
let clearTime = 0
// let clearBfb = 0
var appShiLi = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 歌曲详情
        musicMess: {},
        // 歌曲url
        musicUrl: '',
        // 当前歌曲是否播放
        isPlay: false,
        // 当前音频总长度
        duration: '00:00',
        // 当前播放进度
        broadcastPace: '00:00',
        // 拖动条进度
        dragBarProgress: 0,
        // 当前播放音乐是总列表中所处的index
        mindex: 0,
        // 列表中所有音乐的id
        allMid: []
    },

    // 获取当前音乐的所有数据
    async getPlayerMusicMess(mid, mindex) {
        let musicMess = await myResponse("/song/detail", {
            "ids": mid
        })

        let musicUrl = await myResponse('/song/url', {
            "id": mid
        })

        this.setData({
            "musicMess": musicMess.data.songs[0],
            "musicUrl": musicUrl.data.data[0].url,
            "mindex": mindex
        })

        // 设置页面标题
        wx.setNavigationBarTitle({
            title: this.data.musicMess.name
        })
    },

    // 设置歌曲播放状态
    setMusicPlayState() {
        let isPlay = this.data.isPlay
        this.setData({
            "isPlay": !isPlay
        })

        if (isPlay) {
            BackgroundAudioManager.pause()
        } else {
            BackgroundAudioManager.play()
        }
    },

    // 设置拖动条的位置

    // setTdtWz() {
    //     clearBfb = setInterval(() => {
    //         let bfb = BackgroundAudioManager.currentTime / BackgroundAudioManager.duration * 100
    //         this.setData({
    //             "dragBarProgress": bfb
    //         })

    //         appShiLi.globalData.jinDu = bfb
    //     }, 30);
    // },


    // 音乐实时播放进度
    setShiShiJinDu() {
        // 设置实时播放进度
        clearTime = setInterval(() => {
            let xfen = parseInt(BackgroundAudioManager.currentTime / 60)
            let xmiao = Math.round(BackgroundAudioManager.currentTime % 60)
            if ((xfen + '').length < 2) {
                xfen = '0' + xfen
            }
            if ((xmiao + '').length < 2) {
                xmiao = '0' + xmiao
            }

            this.setData({
                "broadcastPace": xfen + ":" + xmiao
            })

            appShiLi.globalData.currentTime = xfen + ":" + xmiao
        }, 200);
    },


    // 注册监听音乐播放状态
    thisMusicPlayState() {

        BackgroundAudioManager.onPlay(() => {
            let fen = parseInt(BackgroundAudioManager.duration / 60)
            let miao = Math.round(BackgroundAudioManager.duration % 60)

            if ((fen + '').length < 2) {
                fen = '0' + fen
            }
            if ((miao + '').length < 2) {
                miao = '0' + miao
            }

            this.setShiShiJinDu()
            // this.setTdtWz()

            this.setData({
                "isPlay": true,
                "duration": fen + ":" + miao
            })

            appShiLi.globalData.musicPlay = true
            appShiLi.globalData.allTime = fen + ":" + miao
        })

        BackgroundAudioManager.onPause(() => {
            clearInterval(clearTime)
            // clearInterval(clearBfb)
            this.setData({
                "isPlay": false
            })

            appShiLi.globalData.musicPlay = false
        })

        BackgroundAudioManager.onEnded(() => {
            clearInterval(clearTime)
            // clearInterval(clearBfb)
            this.setData({
                "isPlay": false,
                "broadcastPace": "00:00"
            })
            appShiLi.globalData.currentTime = "00:00"
            appShiLi.globalData.jinDu = 0
            appShiLi.globalData.musicPlay = false
        })

        BackgroundAudioManager.onStop(() => {
            clearInterval(clearTime)
            // clearInterval(clearBfb)
            this.setData({
                "isPlay": false,
                "broadcastPace": "00:00"
            })
            appShiLi.globalData.currentTime = "00:00"
            appShiLi.globalData.jinDu = 0
            appShiLi.globalData.musicPlay = false
        })

        // 点击上一首
        BackgroundAudioManager.onPrev(() => {
            console.log('上')
        })

        // 点击下一首
        BackgroundAudioManager.onNext(() => {
            console.log('下')
        })

        // 进度发生改变
        BackgroundAudioManager.onTimeUpdate(() => {
            let bfb = BackgroundAudioManager.currentTime / BackgroundAudioManager.duration * 100
            this.setData({
                "dragBarProgress": bfb
            })
            appShiLi.globalData.jinDu = bfb
        })
    },



    // 设置全局音乐信息
    setGlobalMusicMess() {
        // 设置音乐播放信息
        BackgroundAudioManager.title = this.data.musicMess.name
        BackgroundAudioManager.epname = this.data.musicMess.name
        BackgroundAudioManager.singer = this.data.musicMess.ar[0].name
        BackgroundAudioManager.coverImgUrl = this.data.musicMess.al.picUrl
        BackgroundAudioManager.src = this.data.musicUrl
    },

    // 拖动条拖动过程触发
    tdgc() {
        // clearInterval(clearBfb)
        BackgroundAudioManager.pause()
    },

    // 拖动完成触发
    tdwc(e) {
        let bfb = e.detail.value / 100
        BackgroundAudioManager.seek(BackgroundAudioManager.duration * bfb)
        BackgroundAudioManager.play()
        // this.setTdtWz()
    },

    // 判断正在播放的音乐是否是用户点击的音乐
    isUserClickMusic() {
        if (appShiLi.globalData.musicId != this.data.musicMess.id) {
            appShiLi.globalData.musicId = this.data.musicMess.id
            appShiLi.globalData.musicPlay = true
            appShiLi.globalData.currentTime = "00:00"
            appShiLi.globalData.jinDu = 0
        } else {
            if (appShiLi.globalData.musicPlay) {
                this.setData({
                    "isPlay": true,
                    "dragBarProgress": appShiLi.globalData.jinDu,
                    "broadcastPace": appShiLi.globalData.currentTime,
                    "duration": appShiLi.globalData.allTime
                })
                // this.setTdtWz()
                this.setShiShiJinDu()
            } else {
                BackgroundAudioManager.pause()
                this.setData({
                    "isPlay": false,
                    "dragBarProgress": appShiLi.globalData.jinDu,
                    "broadcastPace": appShiLi.globalData.currentTime,
                    "duration": appShiLi.globalData.allTime
                })
            }
        }
    },

    // 用户点击上一首
    async onPrev() {
        let mindex = Number(this.data.mindex)
        if (mindex != 0) {
            mindex = mindex - 1
            this.setData({
                "mindex": mindex - 1
            })
        } else {
            let allMid = this.data.allMid
            mindex = allMid.length - 1
            this.setData({
                "mindex": mindex
            })
        }

        await this.getPlayerMusicMess(this.data.allMid[mindex], mindex)
        await this.setGlobalMusicMess()
        await this.thisMusicPlayState()
        await this.isUserClickMusic()
    },

    // 用户点击下一首
    async onNext() {
        let mindex = Number(this.data.mindex)
        if (mindex != (this.data.allMid.length - 1)) {
            mindex = mindex + 1
            this.setData({
                "mindex": mindex + 1
            })
        } else {
            mindex = 0
            this.setData({
                "mindex": mindex
            })
        }
        await this.getPlayerMusicMess(this.data.allMid[mindex], mindex)
        await this.setGlobalMusicMess()
        await this.thisMusicPlayState()
        await this.isUserClickMusic()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        await this.getPlayerMusicMess(options.mid, options.mindex)
        await this.setGlobalMusicMess()
        await this.thisMusicPlayState()
        await this.isUserClickMusic()

        const eventChannel = this.getOpenerEventChannel()
        // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
        eventChannel.on('songListId', (data) => {
            this.setData({
                "allMid": data.data
            })
        })
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