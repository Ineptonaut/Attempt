const Movie = require('../Models/post');

exports.getPosts = (req, res, next) => {
    Movie.find()
        .then((foundPosts) => {
            res.status(200).json({
                message: "All posts",
                posts: foundPosts
            });
        })
        .catch(err => {
            console.error('error fetching posts', err);
            err.status(500).json({error: "error while fetching posts"});
        });
};

exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const star_actors = req.body.star_actors;
    const director = req.body.director;
    const genre = req.body.genre;

    const post = new post({
        title: title,
        description: description,
        star_actors: star_actors,
        director: director,
        genre: genre
    });

    post.save().then(postSaved => {
        res.status(201).json({
            message: 'Post saved successfully',
            post: postSaved
        });
    })
    .catch(err => console.log('err', err));
}