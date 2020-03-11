<template>
  <div class="home">

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
        ]
      }
    },
    components: {

    },
    methods: {
      onChange(index) {
        this.$toast('当前 Swipe 索引：' + index);
      },
      onClickLeft() {
        this.$router.push('Chart')
      },
      onClickRight() {
        this.$toast('新闻');
      }
    },
    mounted() {
     




    },
    activated() {

    }
  }
</script>
<style lang='scss' scoped>
  @import'../scss/mixin.scss';

  @import '../scss/home.scss';
</style>