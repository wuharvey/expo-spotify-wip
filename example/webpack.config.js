const createConfigAsync = require('expo/webpack-config');
const path = require('path');

module.exports = async (env, argv) => {
  const config = await createConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ['expo-spotify'],
      },
    },
    argv,
  );
  config.resolve.modules = [
    path.resolve(__dirname, './node_modules'),
    path.resolve(__dirname, '../node_modules'),
  ];
  // add externals to avoid double react installs in example app (needed only if app project is nested)
  config.externals = [
    {
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
        root: 'React',
      },
    },
  ];

  return config;
};
