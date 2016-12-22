module.exports = {
  entry: './component/index',
  output: {
    path: './',
    filename: 'bundle.js'
  },
  module: {
    
    
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: [ 'es2015', 'react','stage-2']},
      }
      
    ]
    
  },
  devServer: {
      inline: true,
      port: 8888
   },
   node: {
  fs: "empty"
}

};