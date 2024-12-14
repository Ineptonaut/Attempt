const express = require('express');
const router = express.Router();
const Show = require('../Models/tvpost');

router.get('/', async (req, res) => {
    try {
        const Shows = await Show.find();

        res.render('showsListView', { 
            nav: [
                {link: '/public/views/showsListView', title: 'Shows'},
                {link: '/about', title: 'About'},
            ],
            title: 'shows found', Shows});
    } catch (error) {
        console.error('error fetching items', error);
        res.status(500).send('error loading page');
    }
});

module.exports = router;