const path = require( 'path' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

let SRC = path.resolve( __dirname, 'src/' );

module.exports = ( _env, argv ) => {
  return {
    mode: argv.mode,
    entry: './src/index.js',
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'enface-auth-widget.js',
      library: 'EnfaceAuthWidget',
      libraryTarget: 'window'
    },
    plugins: [new CleanWebpackPlugin()],
    module: {
      rules: [
        {
          test: /\.(ttf|eot|woff(2)?|svg|gif|png|jpg|mp3)$/,
          include: SRC,
          use: [
            {
              loader: 'file-loader'
            }
          ]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.(scss|css)$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    }
  };
};
