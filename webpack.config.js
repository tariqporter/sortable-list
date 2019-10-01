const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const pkg = require('./package.json');

const banner = `${pkg.name} v ${pkg.version} | (c) ${new Date().getFullYear()} ${pkg.author} | ${pkg.license} | ${pkg.homepage}`;
const env = process.env.BUILD_ENV;

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'lib/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: (env === 'dist') ? 'react-sortable-list.min.js' : 'react-sortable-list.js',
    libraryTarget: 'umd',
    library: 'SortableList'
  },
  optimization: {
    minimizer: [
      (env === 'dist') && (
        new TerserPlugin()
      )
    ].filter(Boolean)
  },
  plugins: [
    new webpack.BannerPlugin(banner)
  ],
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  }
};
