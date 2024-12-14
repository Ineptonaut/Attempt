const express = require('express');
const aboutrouter = express.Router();

aboutrouter.route('/')
    .get((req, res) => {
        res.render('about', {
            nav: [
                {link: '/public/views/moviesListView', title: "Movies"},
                {link: '/public/views/about', title: 'About'}
            ],
            title: 'Cineverse - About'
        });
    });

module.exports = aboutrouter;