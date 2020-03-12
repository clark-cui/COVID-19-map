<template>
  <div class="home">
   <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
    </van-dropdown-menu>
    <van-nav-bar title="首页" left-text="地图" right-text="新闻" :left-arrow="false" @click-left="onClickLeft"
      @click-right="onClickRight" />

    <van-swipe :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>

 
    <van-button type="info" size="large">默认按钮</van-button>
  </div>
</template>

<script>
  // @ is an alias to /src
  import axios from 'axios'
  export default {
    name: 'Home',
    data() {
      return {
        images: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg',
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg',
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg',
        ],
        value1: 0,
        option1: [{
            text: '湖北省',
            value: 0
          },
          {
            text: '山东省',
            value: 1
          },
          {
            text: '河南省',
            value: 2
          }
        ],

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
      onClickRight() {
        this.$toast('新闻');
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