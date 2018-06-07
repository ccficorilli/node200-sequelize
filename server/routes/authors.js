const express = require('express');
const router = express.Router();
const db = require('../db/models/index');

router.get('/', (req, res) => {
    db.Author.findAll()
    .then(authors => res.status(200).json(authors))
    .catch(err => res.status(404).send('No authors found'));

});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.Author.findById(id)
        .then(found => found
                    ? res.status(200).json(found)
                    : res.status(404).send())
        .catch(err => console.log(err));
});

router.get('/:id/blogs', (req, res) => {
    const id = req.params.id;
    db.Blog.findAll({
        where: { authorId: id }
    })
    .then(blogs => res.status(200).json(blogs))
    .catch(err => console.log(err));
});

router.post('/', (req, res) => {
    const newAuthor = req.body;
    db.Author.create(newAuthor)
    .then(saved => res.status(201).json(saved))
    .catch(err => res.status(500).send('error saving to file'));
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let info = req.body;
    db.Author.update( info, { 
        where: {
            id
        }
    })
    .then(author => res.status(204).json(author))
    .catch(err => console.log(err));
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.Author.destroy({
        where: {
            id
        }
    })
    .then(deleted => res.status(200).send('Author deleted'))
    .catch(err => console.log(err));
});

module.exports = router