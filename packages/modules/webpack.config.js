const projectInfo = require('./package.json');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const projectVersion = projectInfo.version;


module.exports = (env, argv) => {
    const config = {
        target: 'web',
        entry: {
            entryTestModule: './src/testModule.js',
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader']
                }
            ]
        },
        resolve: {
            extensions: ['.js'],
            alias: {
                '@': path.resolve(__dirname, 'src/'),
            },
        },
        output: {
            environment: {
                arrowFunction: false,
                bigIntLiteral: false,
                const: false,
            },
            publicPath: '/',
            filename: '[name].js',
            globalObject: 'this',
            path: path.resolve(__dirname, 'dist'),
            library: {
                name: ['jxplus', '[name]'],
                type: 'umd',
                export: 'default',
            },
        },
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin({
                'process.env.VERSION': JSON.stringify(projectVersion),
            }),
        ]
    }

    if(argv.mode === 'development') {
        const devHtmls = [
            new HtmlWebpackPlugin({
                chunks: ['testModule'],
                template: './html/testModule.html',
                filename: './testModx.html',
                minify: false,
            })
        ];

        config.plugins.push(...devHtmls);
    }

    return config;
}