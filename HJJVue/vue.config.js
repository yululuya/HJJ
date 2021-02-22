const path = require("path");
module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  runtimeCompiler: true,
  devServer: {
    host: "localhost",
    port: 9090,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: "http://127.0.0.1:9999/", //测试接口地址
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: ""
        },
      },
    },
  },
  configureWebpack: () => ({
    resolve: {
      alias: {
        "@": path.resolve("src")
      }
    }
  })
};