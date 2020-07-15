const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
                '@primary-color': '#2C7CF6',
                '@border-radius-base': '15px'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};