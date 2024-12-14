const express = require('express');
const router = express.Router();
const Movie = require('../Models/post');

router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();

        res.render('moviesListView', { 
            nav: [
                {link: '/public/views/moviesListView', title: 'Movies'},
                {link: '/about', title: 'About'},
            ],
            title: 'movies found', movies});
    } catch (error) {
        console.error('error fetching items', error);
        res.status(500).send('error loading page');
    }
});

module.exports = router;