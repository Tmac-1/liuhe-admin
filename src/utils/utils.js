import OSS from 'ali-oss';


const uploadImg = (info)=>{
    // console.log('info',info)
    const client = new OSS({
        region: 'oss-cn-beijing',   // 创建Bucket时会选择不同地区，根据自己的选择填入对应名称
        accessKeyId: 'LTAI4FqLhaJZscodtwrrMzDR',     // 填入你的accessKeyId
        accessKeySecret: 'rYh3RuG4EJoUNtDYgY92YLsDRrhpwH', // 填入你的accessKeySecret
        bucket: '6liuhe'                // 填入你的bucket名
    })

    const name = info.file.name
    const suffix = name.substr(name.indexOf('.'))              // 文件后缀
    const filename = Date.parse(new Date()) + suffix           // 组成新文件名

    return new Promise((resolve,reject)=>{
        client.multipartUpload(filename, info.file).then(res => {   // 上传
            // console.log('上传成功：',res)
            resolve(res)
            // ... 你的操作，可以拼接图片url，用于显示等...
        }).catch(err => {
            // console.log('上传失败：', err)
            reject(err)
        })
    })
}


export  {
    uploadImg
}








