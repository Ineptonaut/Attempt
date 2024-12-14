require('dotenv').config();

const express = require('express');
const app = express();
const chalk = require('chalk');
const path = require('path');
const cors = require('cors');
const blogrouter = require('./routes/movieRouter');
const tvrouter = require('./routes/tvRouter');
const aboutrouter = require('./routes/aboutRouter');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(express.json());

app.use('/moviesListView', blogrouter)
app.use('/about', aboutrouter)
app.use('/showsListView', tvrouter);
app.use(cors());

app.set('views', './public/views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')))
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

mongoose.connect(process.env.MONGO_URL, 
    {useNewUrlParser: true, useUnifiedTopology: true}
)
.then(() => console.log('database connected'))
.catch(err => console.error('connection error', err));

app.use(bodyParser.urlencoded({ extended: true}));

app.listen(3000, function(){
    console.log(`Listening on port ${chalk.green('3000')}`);
});

app.get('/', function(req, res){
    res.render('index', 
    {
        nav: [
            {link: '/moviesListView', title: 'Movies'},
            {link: '/showsListView', title: 'TV shows'},
            {link: '/about', title: 'About'},
        ],
        title: 'Cineverse',
    }
    );
});

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js');
};