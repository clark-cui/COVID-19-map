<template>
  <div class="home">
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

      }
    },
    components: {

    },
    methods: {

    },
    mounted() {
      axios.get('https://lab.isaaclin.cn/nCoV/api/area').then((r) => {
        console.log(r)
      }).catch(e => {
        console.log(e)
      })
    },
    activated() {

    }
  }
</script>
<style lang='scss' scoped>
  @import'../scss/mixin.scss';

  @import '../scss/home.scss';
</style>