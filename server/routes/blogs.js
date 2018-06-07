const express = require('express');
const router = express.Router();
const db = require('../db/models/index');

router.get('/', (req, res) => {
    db.Blog.findAll()
    .then(blogs => res.status(200).json(blogs))
    .catch(err => res.status(404).send('No blogs found'));

});
router.get('/featured', (req, res) => {
    db.Blog.findAll({ 
        where: { featured: true }
    })
    .then(featured => res.status(200).json(featured))
    .catch(err => { 
        console.log(err);
        res.status(500).send('something did not work with featured blogs')
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.Blog.findById(id)
        .then(found => found
                    ? res.status(200).json(found)
                    : res.status(404).send())
        .catch(err => console.log(err));
});

router.post('/', (req, res) => {
    let newBlog = req.body;
    newBlog.authorId = req.query.authorId;
    db.Blog
      .create(newBlog)
      .then(blogs => {res.status(201).json(blogs)});
  });
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const info = req.body;
    db.Blog.update( info, { 
        where: {
            id
        }
    })
    .then(stored => res.status(204).json(stored))
    .catch(err => console.log(err));
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.Blog.destroy({
        where: {
            id
        }
    })
    .then(deleted => res.status(200).send('Author deleted'))
    .catch(err => console.log(err));
});

module.exports = router