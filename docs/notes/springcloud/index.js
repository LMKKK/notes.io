// node fs模块
const fs = require('fs');
// node path模块
const path = require('path');
// 被读取的文件夹地址
const filePath = __dirname
// 收集所有的文件路径
const arr = [];
const fileDisplay = filePath => {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function (err, files) {
        if (err) return console.error('Error:(spec)', err)
        files.forEach((filename) => {
            //获取当前文件的绝对路径
            const filedir = path.join(filePath, filename);
            // fs.stat(path)执行后，会将stats类的实例返回给其回调函数。
            fs.stat(filedir, (eror, stats) => {
                if (eror) return console.error('Error:(spec)', err);
                // 是否是文件
                const isFile = stats.isFile();
                // 是否是文件夹
                const isDir = stats.isDirectory();
                if (isFile) {
                    if(path.extname(filedir) === '.md'){
                        console.log('符合要求')
                        let fileName = path.basename(filedir.slice(0,filedir.length - 3))
                        let tmp = {
                            text:  fileName,
                            link: '/notes/springcloud/'+ fileName
                        }
                        arr.push(tmp)
                        console.log(filedir)
                    }
                }
                // 如果是文件夹
                if (isDir) fileDisplay(filedir);
            })
        });

    });
}


fileDisplay(filePath)

setTimeout(()=>{
    fs.writeFile(__dirname + '/springcloud.json', JSON.stringify(arr), (err) => {
        if(err){

            console.log('springcloud写入失败')
        }
    })
},2000)