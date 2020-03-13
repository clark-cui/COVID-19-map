<template>
    <div class="newsItem" @click="go">
        <div class="newsTitle">{{title}}</div>
        <div class="newsTime">{{timeStamp}}</div>
    </div>
</template>
<script>
    export default {
        props:{
                title:String,
                time: Number,
                sourceUrl:String,
        },
        name: 'newsItem',
        data() {
            return {
                    timeStamp: this.getTime(this.time)
            }
        },
        methods: {
              //获取时间
            getTime(t) {
                // console.log(t)
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

                // console.log(hours, minutes, seconds)
                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            },
            go(){
                location.href=this.sourceUrl
            }
        },
        mounted() {

        },
        activated() {

        },
    }
</script>
<style lang="scss" scoped>
    @import '../scss/mixin.scss';

    .newsItem{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: nowrap;
        font-size: px(60);
        padding:px(15) 0;
        .newsTitle{
            text-align: left;
        }
        .newsTime{
            color: #999999;
        }
    }
</style>