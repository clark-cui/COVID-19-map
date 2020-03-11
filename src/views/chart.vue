<template>
    <div class="chart">
        <div id="mychart">
        </div>
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
                option: {
                    title: {
                        text: '疫情地图',
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
                        // splitNumber:4,
                        pieces: [
                            //分段
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
                        // align:'right'
                        //orient:'horizontal' 默认竖直
                        //left right 这些属性控制分段所在的位置
                        //textStyle() 分段大小
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

        },
        mounted() {
            let myChart = echarts.init(document.getElementById('mychart'));
            //获取接口数据
            myChart.showLoading();

            axios.get('https://lab.isaaclin.cn/nCoV/api/area').then((r) => {
                console.log(r)
                myChart.hideLoading();
                let ChinaList = r.data.results.filter((item) => {
                    return item.countryName === '中国'
                })
                let list = ChinaList.map(item =>
                    ({
                        name: item.provinceShortName,
                        value: item.currentConfirmedCount
                    }));
                //填充data=[{name:',value:'}...]
                console.log(list, "data")
                this.option.series[0].data = list;
                // 绘制图表
                myChart.setOption(this.option);
            }).catch(e => {
                console.log(e)
                myChart.hideLoading();
            })


        },
        activated() {

        }
    }
</script>
<style lang='scss' scoped>
    @import '../scss/mixin.scss';
    @import '../scss/chart.scss'
</style>