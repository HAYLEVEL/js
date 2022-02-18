const express = require('express');
const userRouter = require('./routes/users.js');
const websiteRouter = require('./routes/websites.js');
const mediaRouter = require('./routes/media.js');
const homeRouter = require('./routes/home.js');
const bodyParser = require("body-parser");
const busboy = require('busboy-body-parser');
const mustache = require('mustache-express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const busboyOptions = {
    limit: '10mb',
    multi: false,
}
const viewDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewDir, 'partials');
app.engine('mst', mustache(partialsDir));
app.set('views', viewDir);
app.set('view engine', 'mst');
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(busboy(busboyOptions));
app.use('/media', mediaRouter);
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/', (req, res) => {
    res.render('index');
});
app.use('/users', userRouter);
app.use('/websites', websiteRouter);
app.get('/data/media/:url', (req, res) => {
    res.sendFile(`${__dirname}/data/media/${req.params.url}`);
});


app.listen(3000, () => console.log('ready'));