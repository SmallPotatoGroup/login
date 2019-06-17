const autoprefixer = require('autoprefixer');
const path = require("path");

module.exports = {
    entry: ['./views/app.scss', './views/app.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "public")
    },
    devServer: {
        contentBase: path.join(__dirname, "views"),
        index: "./views/index.html",
        before: function (app, server) {
            app.get('/public/:file', function (req, res) {
                res.redirect(req.params.file);
            });
        },
        liveReload: true,
        port: 8000
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: 'bundle.css',
                        },
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: ['./node_modules'],
                        },
                    }
                ],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env'],
                },
            }
        ],
    },
};