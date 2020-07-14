const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
                '@primary-color': '#6C49B8',
                '@border-radius-base': '15px'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};