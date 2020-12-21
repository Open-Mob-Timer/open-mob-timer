/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/naming-convention */
const CopyPlugin = require('copy-webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const path = require('path');


console.log('building server...');
module.exports = {
    entry: {
        server: path.resolve(__dirname, 'server.ts')
    },
    target: 'node',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    },
    optimization: {
        minimize: false
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },
    plugins: [
        new FilterWarningsPlugin({
            exclude: [/mongodb/, /mysql/, /mysql2/, /oracledb/, /pg/, /pg-native/, /pg-query-stream/, /react-native-sqlite-storage/, /redis/, /sqlite3/, /sql.js/, /typeorm-aurora-data-api-driver/]
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'web.config'), to: path.resolve(__dirname, '../dist') }
            ],
        }),
    ],
};
