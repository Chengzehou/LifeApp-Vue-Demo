
module.exports = {
    lintOnSave: false,    //取消严格标准模式
    devServer:{
        proxy:{//反向代理
            "/bdapi":{//代理名称
                target:'https://api.benlai.com',//目标公用地址
                pathRewrite:{
                    "^/bdapi":""    //将/bdapi 重写 为 空
                }
            },
            "/bdmoreapi":{
                target:'https://m.benlai.com',//目标公用地址
                pathRewrite:{
                    "^/bdmoreapi":""    //将/bdmoreapi 重写 为 空
                }
            },
            "/nduser":{
                target:'http://39.97.218.98:3000',//目标公用地址
                pathRewrite:{
                    "^/nduser":""    //将/nduser 重写 为 空
                }
            }
        }
    },
    publicPath:"", //项目上线打包   打包时启用
}