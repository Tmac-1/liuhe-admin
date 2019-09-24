
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: '六合-后台管理',
      dll: true,
      locale: {
        enable: true,
        default: 'en-US',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  define: {
    'process.env': 'development', // development  production
  },
  // "proxy": {
  //   "/mis": {
  //     "target": "http://home.dullnull.org:8080",
  //     "changeOrigin": true,
  //     // "pathRewrite": { "^/api" : "" }
  //   }
  // }
}
