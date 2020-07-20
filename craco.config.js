const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
                '@primary-color': '#EB426A',
                '@border-radius-base': '20px'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};