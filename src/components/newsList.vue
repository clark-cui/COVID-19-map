<template>
    <div class="newsList">
        <news-item v-for="(item,index) in newsArr" :key="index" :title="item.title" :time="item.pubDate"
            :sourceUrl='item.sourceUrl'>
            <!--此处不应该用index,但懒得写了  -->

        </news-item>
    </div>
</template>
<script>
    import newsItem from './newsItem.vue'
    import axios from 'axios'
    export default {
        name: 'newsList',
        data() {
            return {
                newsArr: [],
            }
        },
        components: {
            newsItem,
        },
        methods: {
            getNews(d) {
                if (d === '') {
                    this.getChinaNews()
                }else if(d==="世界"){
                    this.getChinaNews()

                }else{
                    this.getProvinceNews(d)
                }


            },
            getProvinceNews(d) {
                        console.log(d,"传递了啥")
                axios.get('https://lab.isaaclin.cn/nCoV/api/news', {
                        params: {
                            province: d,
                        }
                    })
                    .then((r) => {
                        console.log(r, "onews接口数据")
                        this.newsArr = r.data.results

                    }).catch((e) => {
                        console.log(e, "news接口报错")
                    })
            },
            getChinaNews() {

                axios.get('https://lab.isaaclin.cn/nCoV/api/news')
                    .then((r) => {
                        console.log(r, "onews接口数据")
                        this.newsArr = r.data.results

                    }).catch((e) => {
                        console.log(e, "news接口报错")
                    })
            }
        },
        mounted() {
            this.getNews('世界');
        },
        activated() {

        },
    }
</script>
<style lang="scss" scoped>
    @import '../scss/mixin.scss';

    .newsList {
        padding: px(50)
    }
</style>