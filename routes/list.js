const express = require('express');
const router = express.Router();
const List = require('../models/list');
const User = require('../models/user');

// create a list
router.post('/new', (req, res, next) => {

    const newList = new List({
        user: req.auth._id,
        name: req.body.name,
        isPinned: req.body.isPinned || false,
        listItems: []
    });

    newList.save()
        .then(list => {
            User.findByIdAndUpdate(req.auth._id, { $push: { lists: list._id } })
                .catch(err => {
                    console.log(err);
                    res.status(500);
                    return next(err);
                });
            res.status(201);
            return res.send(list);
        }).catch(err => {
            console.log(err);
            res.status(500);
            return next(err);
        });
});

// get a list
router.get('/:listId', (req, res, next) => {
    List.findById(req.params.listId)
        .then(foundList => {
            if (!foundList) {
                res.status(200);
                return res.send("No list was found");
            }
            console.log(foundList);
            res.status(200);
            return res.send(foundList);
        }).catch(err => {
            console.log(err);
            res.status(500);
            return next(err);
        });
});

// gets all lists of a user
router.get('/', (req, res, next) => {
    List.find({ user: req.auth._id })
        .then(foundLists => {
            res.status(200);
            return res.send(foundLists);
        }).catch(err => {
            console.log(err);
            res.status(500);
            return next(err);
        });
});

// deletes a list
router.delete('/:listId', (req, res, next) => {
    List.findByIdAndDelete(req.params.listId)
        .then(foundList => {
            if (!foundList) {
                res.status(200);
                return res.send("No list found.");
            }
            console.log(foundList);
            res.status(200);
            return res.send("List deleted");
        }).catch(err => {
            console.log(err);
            res.status(500);
            return next(err);
        });
});

// updates list
router.put('/list', (req, res, next) => {

    List.findOneAndReplace({ _id: req.body._id, user: req.auth._id }, req.body)
        .then(foundList => {
            if (!foundList) {
                res.status(400);
                return next(new Error('List does not exist'));
            }
            res.status(200);
            return res.send(foundList);
        }).catch(err => {
            console.log(err);
            res.status(500);
            return next(err);
        });
});

// adds a new item to a list
router.post('/:listId/new-item', (req, res, next) => {

    List.findOneAndUpdate(
        { user: req.auth._id, _id: req.params.listId },
        { $push: { listItems: req.body } }),
        { new: true }
            .then(foundList => {
                console.log(foundList);
                res.status(201);
                return res.send(foundList);

            }).catch(err => {
                console.log(err);
                res.status(500);
                return next(err);
            });
});

module.exports = router;