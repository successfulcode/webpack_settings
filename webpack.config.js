const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev 

module.exports = {
  context: path.resolve(__dirname, 'src'), //nurodo kur guli mūsų visi failai
  mode: 'development', //Režimas
  entry: {
    main: './index.js',
    analytics: './analytics.js',
  }, //Įėjima taškas jisa gali būti vienas ar keletas (objektas), be src nes nustatytas kontekstas
  output: {
    filename: '[name].[contenthash].js', //name parodo iėjimo tašką pvz. main arba analytics. contenthash -einamasis js failas.
    path: path.resolve(__dirname, 'dist'), //Ziurim, kur dabar esame ir sudedame viska i folderi dist
  },
  resolve: {
    extensions: ['.js', '.json', '.png'], //Nustatome default formatus, kurių galima nerašyti importuose
    alias: {
      '@models': path.resolve(__dirname, 'src/models'), //Galima bus importuoti pagal @models
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization:{
    splitChunks: {
      chunks: 'all'
    }
  }, //Otimizuoja, pvz. jeigu biblioteka jungiama dvejose faila, padaro atskirus vendors failus per kurios viską pajungia
  devServer: {
    open: true,
    port: 4200,
    hot: isDev
  }, //Dev serveris automatiskai perkrauna puslapį po pakeitimų
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd //Optimizuojasi html kodas
      }
    }),
    new CleanWebpackPlugin(), //Pluginas kuris išalo folderį dist
    new CopyWebpackPlugin({
      patterns: [
          {
              from: path.resolve(__dirname, 'src/assets/favicon.ico'),
              to: path.resolve(__dirname, 'dist')
          }
    ]
}),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  module: {
    rules: [
      {
      test: /\.css$/, //Nurodome duomenų tipą
      use: [{
        loader: MiniCssExtractPlugin.loader, 
        options: {
          // hmr: isDev,
          // reloadAll: true
      }},
      'css-loader'] //Nurodome kokius loaderius naudoti prie nurodyto formato. Webpack viską žiūri iš dešinės į kairė
    },
    {
      test: /\.(png|jpg|svg|gif)$/,
      use: ['file-loader']
    },
    {
      test: /\.(ttf|woff|woff2|eot)$/, //Šriftai
      use: ['file-loader']
    },
    {
      test: /\.xml$/, 
      use: ['xml-loader']
    },
    {
      test: /\.csv$/, 
      use: ['csv-loader']
    },
  ]
  }
};
