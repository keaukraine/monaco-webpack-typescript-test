const commonConfig = {
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
    mode: "development",
    // mode: "production",
    output: {
        filename: "[name].bundle.js"
    }
}

const workersConfig = {
    ...commonConfig,
    target: "webworker",
    entry: {
        "editor.worker": "monaco-editor/esm/vs/editor/editor.worker.js",
        "ts.worker": "monaco-editor/esm/vs/language/typescript/ts.worker"
    }
};

commonConfig.optimization = {
    ...commonConfig.optimization,
    splitChunks: {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all'
            }
        }
    }
}

module.exports = [commonConfig, workersConfig];
