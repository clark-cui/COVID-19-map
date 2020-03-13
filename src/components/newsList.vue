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
            getNews() {
                axios.get('https://lab.isaaclin.cn/nCoV/api/news', {
                    params:{
                            province : '湖北省',
                    }               
                    }
                )

                
                .then((r) => {
                    console.log(r, "onews接口数据")
                    this.newsArr = r.data.results

                }).catch((e) => {
                    console.log(e, "news接口报错")
                })
            }
        },
        mounted() {
            this.getNews();
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