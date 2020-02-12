const path = require('path');
module.exports = {
  outputDir: 'docs',
  publicPath: '/Jason.github.io/',
  transpileDependencies: ['vuetify'],
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type =>
      addStyleResource(config.module.rule('scss').oneOf(type))
    );
    // 添加对 MD 文件的支持
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('text-loader')
      .loader('text-loader')
      .end();
  }
};

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/styles/global.scss')]
    });
}
