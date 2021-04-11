import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
/* import helmet from 'helmet'; */
import Template from './../template';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import devBundle from './devBundle'; //this is just for development
import path from 'path';
//Importando los modulos para el server-side rendering
import React from 'react';
import ReactDomServer from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import MainRouter from './../client/MainRouter';
import {ServerStyleSheets, ThemeProvider} from '@material-ui/styles';
import theme from './../client/theme';


const CURRENT_WORKING_DIR = process.cwd()

const app = express();
devBundle.compile(app); //this is just for development


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
/* app.use(helmet()); ESTE MIDDLEWARE SE QUITA PORQUE DA MUCHOS PROBLEMAS*/
app.use(cors());

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

//mount routes
app.use('/', authRoutes);
app.use('/', userRoutes);

/* Se sustituye esto por el metodo del server-side rendering
app.get('/', (req, res) => {
    res.status(200).send(Template())
}); */

//Server-side rendering: Generating CSS and markup
app.get('*', (req,res) => {
    const sheets = new ServerStyleSheets();
    const context = {};
    const markup = ReactDomServer.renderToString(
        sheets.collect(
            <StaticRouter location={req.url} context={context}>
                <ThemeProvider theme={theme}>
                    <MainRouter />
                </ThemeProvider>
            </StaticRouter>
        )
    )

    if (context.url) {
        return res.redirect(303, context.url)
    }

    const css = sheets.toString();
    res.status(200).send(Template({
        markup: markup,
        css: css
    }))

})

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ 'error': err.name + ': ' + err.message });
    } else if (err) {
        res.status(400).json({ "error": err.name + ": " + err.message });
        console.log(err);
    }
});



export default app;
