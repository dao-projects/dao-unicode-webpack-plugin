# dao-unicode-webpack-plugin

基于Webpack的中文转Unicode插件

## 如何使用

1. 安装DaoUnicodeWebpackPlugin

```
$ npm i dao-unicode-webpack-plugin -D
```

2. 配置webpack.config.js

```
<!-- 在头部引入插件 -->
var DaoUnicodeWebpackPlugin = require("dao-unicode-webpack-plugin");
<!-- 配置plugins -->
.....
plugins: [
     // 中文转Unicode
    new DaoUnicodeWebpackPlugin(),
]
```

3. 如其他环境如vue.config.js

```

let env = process.env.NODE_ENV == "development" ? "development" : "production";

module.exports = {
   ......
   configureWebpack: config => {
          // 为生产环境修改配置...
          if (env) {
            config.plugins.push(
               // 中文转Unicode
               new DaoUnicodeWebpackPlugin(),
            )
        }
   }
   ......
```
