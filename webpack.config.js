const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const devMode = process.env.NODE_ENV !== 'production';
let path = require( 'path' );
let SRC = path.resolve( __dirname, 'src/' );

const defaultConfig = {
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(),
  ].filter( i => i ),
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff(2)?|svg|gif|png|jpg|mp3)$/,
				include: SRC,
				use: [ {
					loader: 'file-loader'
				} ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [ 'babel-loader' ]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
		]
  },
  resolve: {
    extensions: [ '*', '.js', '.jsx' ]
  }

};

module.exports = [ {
  ...defaultConfig,
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'enface-auth-widget.js',
    library: 'EnfaceAuthWidget',
    libraryTarget: 'window'
  }
} ];
