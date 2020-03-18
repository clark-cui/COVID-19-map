![](https://gif-clark-cui.oss-cn-beijing.aliyuncs.com/cirus-logo.png)

# **COVID-19**  ![]( https://img.shields.io/badge/license-MIT-green/)  ![](https://img.shields.io/badge/npm-v6.7.0-green)  ![](https://img.shields.io/badge/node-v11.10.0-green)  ![](https://img.shields.io/badge/release-v1.0.0-green)


移动端疫情地图，新冠肺炎，COVID-19

分为两个页面，首页展示各地新闻，地图页展示疫情图和统计数据，可以在全国与省级切换

**欢迎star**

### **效果**

<!-- 阿里云oss地址，为了减小打包体积  -->
![](https://gif-clark-cui.oss-cn-beijing.aliyuncs.com/%E5%88%87%E6%8D%A2.gif)

![](https://gif-clark-cui.oss-cn-beijing.aliyuncs.com/%E8%B7%B3%E8%BD%AC.gif)

![](https://gif-clark-cui.oss-cn-beijing.aliyuncs.com/%E5%9C%B0%E5%9B%BE.gif)




### **查看**

本项目已经部署在 netlify 上了，最近netlify国内打开很慢，推荐翻墙看，后期等网站备案通过后，我会重新部署

[点击这里打开](https://romantic-lumiere-556a23.netlify.com/)

### **本地打开**

clone下来打开
```
$ git clone https://github.com/clark-cui/virus-map.git
```
```
$ cnpm i
```
```
$ npm run serve
```

**需要设置chrome跨域**
```
--disable-web-security --user-data-dir=新建文件位置
```
[点击这里查看](https://blog.csdn.net/wangxinxin1992816/article/details/88655150)


### **数据来源**
为了避免频繁爬虫造成网页性能浪费(我懒)，直接用了BlankerL爬取的丁香园的接口。

[项目地址](https://github.com/BlankerL/DXY-COVID-19-Crawler)

[数据仓库](https://github.com/BlankerL/DXY-COVID-19-Data)

### **技术栈**
vuejs+ vuex +vue router + axios+ vant+ scss +netlify +alioss
### **问题**
加载慢(接口调用慢)

模板是用官方脚手架，没有添加单元测试，没有添加移动端调试插件Vconsole，后期有空更新。
