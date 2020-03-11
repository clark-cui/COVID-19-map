//批量导入node module里的所有省份地图
const modulesFiles = require.context('../../node_modules/_echarts@4.6.0@echarts/map/js/province/', true, /.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^.\/(.*)\.js/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})