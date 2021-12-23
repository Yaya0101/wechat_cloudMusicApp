// components/songDetailsCom/songDetailsCom.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        murl: {
            type: String,
            value: "https://img1.baidu.com/it/u=277074560,2905468269&fm=26&fmt=auto"
        },
        songList: {
            type: Object
        }
    },


    /**
     * 组件的初始数据
     */
    data: {
        songListId: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 获取音乐列表
        getSonglist() {
            let songListId = []
            for (let i = 0; i < this.properties.songList.length; i++) {
                songListId.push(this.properties.songList[i].id)
            }

            this.setData({
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
        }
    },

    observers: {
        songList() {
            if(this.properties.songList.length){
                this.getSonglist()
            }
        }
    }

})