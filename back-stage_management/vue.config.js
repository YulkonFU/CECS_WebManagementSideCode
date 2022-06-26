const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        port: 8080, //端口号
        proxy: {
            '/api': {
                target: 'http://118.178.236.149:8081', //这里后台的地址模拟的;应该填写你们真实的后台接口
                changOrigin: true, //允许跨域
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
})