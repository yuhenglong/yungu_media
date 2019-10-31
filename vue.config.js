const huaUrl = 'http://192.168.1.168:8080';
const hostUrl = 'http://192.168.1.197:8080';
module.exports = { 
    lintOnSave:  false,
    devServer: {
        // 设置主机地址
        host: 'localhost',
        // 设置默认端口
        port: 8080,
        https: false,
        // 设置代理
        proxy: huaUrl
    }
}