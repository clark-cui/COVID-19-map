<template>
    <div class="chart">
        <div id="mychart">
        </div>
        <div class="partTitle">{{partTile}}</div>
        <div class="numPart">
            <div class="partItem" v-for="(item,index) in numLst" :key="index">
                <div class="itemName">{{item.name}}</div>
                <div class="itemNum">{{item.value}}</div>
            </div>

        </div>
        <van-button type="info" size="normal" v-show="isCity" @click="back">回到全国地图</van-button>

        <div class="text" v-show="isCity">由于爬取的数据在部分地区命名与echart冲突（少数民族自治州），故图中部分地区会有数据缺失，以疫情统计数据为准</div>
        <div class="time">更新时间：{{updateTime}}</div>
    <van-button type="info" size="normal" @click="onClickLeft" :round=true>查看疫情新闻</van-button>

    </div>
</template>>
<script>
    import echarts from 'echarts'
    import axios from 'axios'
    //引入地图
    import '../map/china.js'
    import '../map/world.js'
    import '../map/province.js'
    export default {
        name: 'Chart',
        data() {
            return {
                partTile: '全国疫情统计', //标题
                updateTime: '', //更新时间

                numLst: [{
                        name: '目前确诊人数',
                        value: '',
                    },
                    {
                        name: '累计确诊人数',
                        value: '',
                    },
                    {
                        name: '疑似人数',
                        value: '',
                    },
                    {
                        name: '治愈人数',
                        value: '',
                    },
                    {
                        name: '死亡人数',
                        value: '',
                    },
                ],
                arr: [], //用来缓存累计数字
                updateTimeStore: '', //用来缓存更新时间
                ChinaList: [],
                isCity: false, //用来禁止二级地图点击事件
                myChart: null, //全局注册echart实列
                option: {
                    title: {
                        text: '中国疫情地图',
                        subtext: '疫情数据爬取自丁香园',
                        sublink: 'https://lab.isaaclin.cn/nCoV/',
                    },
                    series: [{
                        name: "确诊人数",
                        type: 'map', //告诉echarts要去渲染一个地图
                        map: 'china',
                        label: {
                            show: true, // 控制对应地区的汉字
                            color: '#333',
                            fontSize: 10,
                        },
                        roam: true, //控制地图放大缩小
                        zoom: 1.2, //控制地图的放大缩小
                        data: [], //用来展示后台给的数据  {name:xx,value:xxx}
                        /*      控制地图板块的颜色和边框*/
                        itemStyle: {
                            areaColor: '#eee',
                            borderColor: "green" //边框颜色
                        },
                        /*     控制鼠标滑过之后的背景色和字体颜色*/
                        emphasis: {
                            label: {
                                color: '#fff',
                                fontsize: 12
                            },
                            itemStyle: {
                                areaColor: '#83b5e7'
                            }
                        }

                    }],
                    visualMap: [{
                        type: 'piecewise',
                        show: true,

                        pieces: [

                            {
                                min: 10000
                            },
                            {
                                min: 1000,
                                max: 9990
                            },
                            {
                                min: 100,
                                max: 999
                            },
                            {
                                min: 10,
                                max: 99
                            },
                            {
                                min: 1,
                                max: 9
                            },

                        ],

                        inRange: {
                            symbol: 'rect',
                            color: ['#ffc0b1', '#9c0505']
                        },
                        itemWidth: 20,
                        itemHeight: 10
                    }],
                    tooltip: {
                        trigger: 'item' //鼠标移入后显示人数
                    }

                },

            }
        },
        components: {

        },
        methods: {
            onClickLeft(){
                this.$router.go(-1);
            },
            //获取时间
            getTime(t) {
                console.log(t)
                let date = new Date(t);
                let year = date.getFullYear();
                let month = date.getMonth() + 1;

                month = month < 10 ? '0' + month : month
                let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();
                hours = hours < 10 ? '0' + hours : hours
                minutes = minutes < 10 ? '0' + minutes : minutes
                seconds = seconds < 10 ? '0' + seconds : seconds

                console.log(hours, minutes, seconds)
                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            },
            //获取Num
            getNum() {
                axios.get('https://lab.isaaclin.cn/nCoV/api/overall').then((r) => {
                    // console.log(r, "overall接口数据")
                    let arr = r.data.results[0]
                    this.numLst[0].value = arr.currentConfirmedCount
                    this.numLst[1].value = arr.confirmedCount
                    this.numLst[2].value = arr.suspectedCount
                    this.numLst[3].value = arr.curedCount
                    this.numLst[4].value = arr.deadCount
                    this.updateTime = this.getTime(arr.updateTime)
                    // console.log(this.numLst, this.currentConfirmedCount, "看看数组")
                    //缓存数量和时间
                    this.arr = arr
                    this.updateTimeStore = this.getTime(arr.updateTime)


                    //获取map
                    //这里设置setTime是因为接口的服务器对于并发处理能力弱，会报错503
                   setTimeout(()=>{
                        this.getMap();
                   },200) 
                }).catch((e) => {
                    console.log(e, "overall接口报错")
                })

            },
            back() {
                this.isCity = false;
                this.partTile = '全国疫情统计'
                //还原数量和时间
                console.log(this.updateTime, this.updateTimeStore, "gan")
                console.log(this.numLst, this.numLstStore, "gan2")
                this.updateTime = this.updateTimeStore
                this.numLst[0].value = this.arr.currentConfirmedCount
                this.numLst[1].value = this.arr.confirmedCount
                this.numLst[2].value = this.arr.suspectedCount
                this.numLst[3].value = this.arr.curedCount
                this.numLst[4].value = this.arr.deadCount

                //赋值展示数组
                let list = this.ChinaList.map(item =>
                    ({
                        name: item.provinceShortName,
                        value: item.currentConfirmedCount
                    }));
                //填充data=[{name:',value:'}...]
                console.log(list, "data")
                this.option.series[0].data = list;
                this.option.series[0].map = 'china';
                this.option.title.text = '中国疫情地图'
                // 绘制图表
                this.myChart.setOption(this.option);
            },
            getMap() {
                axios.get('https://lab.isaaclin.cn/nCoV/api/area').then((r) => {
                    // console.log(r)
                    this.myChart.hideLoading();

                    // //缓存json，1个小时后再重新获取
                    // localStorage.setItem('virus-area-json')=JSON.stringify(r)

                    this.ChinaList = r.data.results.filter((item) => {
                        return item.countryName === '中国'
                    })
                    // console.log(this.ChinaList)



                    //赋值展示数组
                    let list = this.ChinaList.map(item => ({
                        name: item.provinceShortName,
                        value: item.currentConfirmedCount
                    }))

                    //填充data=[{name:',value:'}...]
                    // console.log(list, "data")
                    this.option.series[0].data = list;

                    // 绘制图表
                    this.myChart.setOption(this.option);

                    //添加点击事件
                    this.myChart.on('click', (params) => {
                        console.log(params)
                        //二级地图不触发
                        if (this.isCity) {
                            return
                        }

                        this.partTile = params.name + "疫情统计"

                        let city = this.ChinaList.filter((item) => {
                            return item.provinceShortName === params.name
                        })
                        this.numLst[0].value = city[0].currentConfirmedCount
                        this.numLst[1].value = city[0].confirmedCount
                        this.numLst[2].value = city[0].suspectedCount
                        this.numLst[3].value = city[0].curedCount
                        this.numLst[4].value = city[0].deadCount
                        this.updateTime = this.getTime(city[0].updateTime)



                        let cityList = city[0].cities.map(item =>
                            //此处由于数据问题，导致城市缺少，比如西双版纳=西双版纳傣族自治州，这类数据没办法
                            ({
                                //数据缺少'市'
                                name: item.cityName.indexOf('州') == '-1' && item.cityName
                                    .indexOf(
                                        '区') == '-1' ? item.cityName + '市' : item.cityName,
                                value: item.currentConfirmedCount
                            })

                        );
                        // console.log(cityList, "城市哦")

                        this.option.series[0].data = cityList;
                        this.option.series[0].map = params.name;
                        this.option.title.text = params.name + '疫情地图'
                        // 绘制图表
                        this.myChart.setOption(this.option);
                        //更新isCity
                        this.isCity = true;
                    });

                }).catch(e => {
                    console.log(e, "area接口报错")
                    this.myChart.hideLoading();
                })
            }
        },
        async mounted() {

            await this.getNum();

            this.myChart = echarts.init(document.getElementById('mychart'));
            //获取接口数据
            this.myChart.showLoading();




        },
        activated() {

        }
    }
</script>
<style lang='scss' scoped>
    @import '../scss/mixin.scss';
    @import '../scss/chart.scss'
</style>