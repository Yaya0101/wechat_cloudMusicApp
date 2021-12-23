// components/Datehead/Datehead.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        murl:{
            type:String,
            value:"https://img1.baidu.com/it/u=277074560,2905468269&fm=26&fmt=auto"
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        month: 0,
        day: 0
    },



    /**
     * 组件的方法列表
     */
    methods: {
        // 获取日期
        getDate() {
            let date = new Date();
            let mday = 0;
            if ((date.getDate() + '').length === 1) {
                mday = 10 + date.getDate()
            } else {
                mday = date.getDate()
            }

            this.setData({
                'month': date.getMonth() + 1,
                'day': mday
            })
        }
    },

    attached: function () {
        this.getDate()
    }

})