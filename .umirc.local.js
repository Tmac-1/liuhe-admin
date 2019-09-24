
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
      title: '六合-后台管理',
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
    'process.env.ZCQIM_ENV': 'development', // development  production
  },
  publicPath: './',
  exportStatic: {
    htmlSuffix: true,
    dynamicRoot: true,
  },
  targets: {
    chrome: 40, firefox: 40, safari: 9, edge: 9, ios: 8, ie:9
  }
}
