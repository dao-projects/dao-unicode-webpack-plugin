/*
 * @Descripttion: 汉字转Unicode
 * @version: 0.0.1
 * @Author: daoxin
 * @Date: 2021-12-06 11:27:12
 * @LastEditors: daoxin
 * @LastEditTime: 2021-12-07 17:34:46
 */
class DaoUnicodeWebpackPlugin {
  constructor() {}
  // 中文转Unicode
  zhCN2Unicode(content) {
    let result = "";
    for (let i = 0; i < content.length; i++) {
      let code = content.charCodeAt(i);
      if (code > 255) {
        result += "\\u" + code.toString(16);
      } else {
        result += content[i];
      }
    }
    return result;
  }
  gbk2Unicode(content) {
    if (!content) return content;
    return content.replace(/([\u0080-\uffff])/gim, (str) => {
      let hex = str.charCodeAt(0).toString(16);
      for (let i = hex.length; i < 4; i++) {
        hex = "0" + hex;
      }
      // console.log("转码=>", str, "\\u" + hex);
      return "\\u" + hex;
    });
  }
  apply(compiler) {
    const _that = this;
    compiler.hooks.emit.tapAsync("DaoUnicodeWebpackPlugin", function (compilation, callback) {
      console.log(`\n****dao-unicode-webpack-plugin****`);
      compilation.chunks.map((chunk) => {
        chunk.files.map((filename) => {
          if (filename.indexOf(".js") > -1) {
            console.log("正在编译资源：", filename);
            const source = compilation.assets[filename].source();
            compilation.assets[filename] = {
              source: () => {
                return _that.gbk2Unicode(source);
              },
              size: () => {
                return source.length;
              }
            };
          }
        });
      });
      console.log(`\n****dao-unicode-webpack-plugin end****\n`);
      callback();
    });
  }
}
module.exports = DaoUnicodeWebpackPlugin;