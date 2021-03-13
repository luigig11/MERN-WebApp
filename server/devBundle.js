import config from './../config/config';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './../webpack.config.client';

const compile = (app) => {
    console.log("Compiling the app in development mode with the configuration of devBlunde.js")
    console.log(`webpackConfig.output.publicPath: ${webpackConfig.output.publicPath}`)
    if (config.env === 'development') {
        console.log("Compiling the app in development mode")
        const compiler = webpack(webpackConfig);
        const middleware = webpackMiddleware(compiler, {            
            publicPath: webpackConfig.output.publicPath
        });
        app.use(middleware);
        app.use(webpackHotMiddleware(compiler));
    }
    
}

export default {
    compile
}