if(process.env == 'development'){
    module.exports = {
        serverUrl:'http://bjliuhe.net.cn:8080',
    }
}else{
    module.exports = {
        serverUrl:'http://bjliuhe.net.cn/:8080',
    }
}
