<template>
  <div class="home">
   <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
      
    </van-dropdown-menu>
   
    <van-swipe :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>

 
    <van-button type="info" size="normal" @click="onClickLeft" :round=true>查看疫情地图</van-button>
  </div>
</template>

<script>
  // @ is an alias to /src
  import axios from 'axios'
  import provinceList from '../map/provinceName.js'
  export default {
    name: 'Home',
    data() {
      return {
        images: [
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584036221702&di=097a3b59f00c77f9a15854d1188e6a51&imgtype=0&src=http%3A%2F%2Fedu.chachaba.com%2FUploads%2F2020-03-05%2F5e60b24aeacbb.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584036385752&di=92bbd128f3b4914f41f79d36d99d5797&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2F5%2F59%2F5932436F998A4D9506BEDE4BCFF63CCA.jpg',
        ],
        value1: "0",
        option1: provinceList,

      }
    },
    components: {

    },
    methods: {
      pickArea(picker, value, index) {
        console.log(`当前值：${value}, 当前索引：${index}`)
      },
      onChange(index) {
        this.$toast('当前 Swipe 索引：' + index);
      },
      onClickLeft() {
        this.$router.push('Chart')
      },
    
      getNews() {
        axios.get('https://lab.isaaclin.cn/nCoV/api/news').then((r) => {
          console.log(r, "onews接口数据")

        }).catch((e) => {
          console.log(e, "news接口报错")
        })
      }
    },
    mounted() {

      this.getNews();


    },
    activated() {

    }
  }
</script>
<style lang='scss' scoped>
  @import'../scss/mixin.scss';

  @import '../scss/home.scss';
</style>