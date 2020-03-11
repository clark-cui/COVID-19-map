const path = require('path')

module.exports = {  
  //该对象将会被 webpack-merge 合并入最终的 webpack 配置 https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
  
  // 部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致
  publicPath: './',  
  // 输出文件目录
  outputDir: 'dist',  
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,  
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,  
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,  
  // 生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  integrity: false,  
  // webpack相关配置
  chainWebpack: (config) => {
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', path.resolve(__dirname, './src'))
  },
  configureWebpack: (config) => {    
  if (process.env.NODE_ENV === 'production') {      
      // 生产环境
      config.mode = 'production'
    } else {      
      // 开发环境
      config.mode = 'development'
    }
  },  
  // css相关配置
  css: {    
    // 是否分离css（插件ExtractTextPlugin）
    extract: true,    
    // 是否开启 CSS source maps
    sourceMap: false,   
    // css预设器配置项
    loaderOptions: {},    
    // 是否启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: false
  },  
  // 是否使用 thread-loader
  parallel: require('os').cpus().length > 1, 
  // PWA 插件相关配置
  pwa: {}, 
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    host: 'localhost',
    port: 8087,
    https: false,
    hotOnly: false,   
    // http 代理配置
    proxy: {      
      '/api': {
        target: 'http://127.0.0.1:3000/api',
        changeOrigin: true,
        pathRewrite: {          
            '^/api': ''
        }
      }
    },
    before: (app) => {}
  }, 
  // 第三方插件配置
  pluginOptions: {

  }
}