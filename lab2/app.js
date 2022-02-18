const express = require('express');
const readline = require('readline-sync');
const Tariff = require("./models/tariff.js");
const expressSwaggerGenerator = require('express-swagger-generator');

const app = express();
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

const expressSwagger = expressSwaggerGenerator(app);
 
const options = {
    swaggerDefinition: {
        info: {
            description: 'TODO: Change this description',
            title: 'TODO: Change this title',
            version: '1.0.0',
        },
        host: 'localhost:8080',
        produces: [ "application/json" ],
    },
    basedir: __dirname,
    files: ['./routes/**/*.js', './models/**/*.js'],
};
expressSwagger(options);

app.listen(8080);
/*, () =>
{
}
);*/

module.exports = app;