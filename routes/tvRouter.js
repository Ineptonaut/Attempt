const express = require('express');
const router = express.Router();
const Show = require('../Models/post');

router.get('/', async (req, res) => {
    try {
        const shows = await Show.find();

        res.render('showsListView', { 
            nav: [
                {link: '/index', title: 'Home'},
                {link: '/moviesListView', title: 'Movies'},
                {link: '/showsListView', title: 'Shows'},
                {link: '/about', title: 'About'},
            ],
            title: 'shows found', shows});
    } catch (error) {
        console.error('error fetching items', error);
        res.status(500).send('error loading page');
    }
});

module.exports = router;