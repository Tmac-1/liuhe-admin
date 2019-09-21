
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
      title: 'zcqIM',
      dll: false,
      routes: {
        exclude: [],
      },
      hardSource: false,
      // pwa: {
      //   workboxPluginMode: 'GenerateSW',
      //   workboxOptions: {
      //     importWorkboxFrom: 'local',
      //     swDest: 'sw.js'
      //   }
      // }
    }],
  ],
  define: {
    'process.env.ZCQIM_ENV': 'production', // development  production
  },
  publicPath: './',
  exportStatic: {
    htmlSuffix: true,
    dynamicRoot: true,
  },
  targets: {
    chrome: 40, firefox: 40, safari: 9, edge: 9, ios: 8, ie:9
  },// 开启压缩功能
  /*chainWebpack(config, { webpack }) {
    config.merge({
      plugin: {
        install: {
          plugin: require('uglifyjs-webpack-plugin'),
          args: [{
            sourceMap: false,
            uglifyOptions: {
              compress: {
                // 删除所有的 `console` 语句
                drop_console: true,
              },
              output: {
                // 最紧凑的输出
                beautify: false,
                // 删除所有的注释
                comments: false,
              },
            }
          }]
        }
      }
    })
  }*/
}
