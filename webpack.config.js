const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/index.js',

    plugins: [
      new CopyPlugin({
          patterns: [
              { from: 'src/index.html', to: '' },
              { from: 'src/images', to: 'images' },
              { from: 'src/sounds', to: 'sounds' },
          ],
      }),
  ],

    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },

    devServer: {
        static: path.join(__dirname, 'dist')
    },
    
    module: {
        rules: [
          {
            test: /\.ts$/,
            include: [path.resolve(__dirname, 'src')],
            use: 'ts-loader',
          },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              // Creates `style` nodes from JS strings
              "style-loader",
              // Translates CSS into CommonJS
              "css-loader",
              // Compiles Sass to CSS
              "sass-loader",
            ],
          },
        ]
      },
};