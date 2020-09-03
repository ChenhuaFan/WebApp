const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
                '@primary-color': '#285CB7',//'#EB426A',
                '@border-radius-base': '10px'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};