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
                    res.status(500);
                    return next(err);
                });
            res.status(201);
            return res.send(list);
        }).catch(err => {
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
            res.status(200);
            return res.send(foundList);
        }).catch(err => {
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
            res.status(500);
            return next(err);
        });
});

// deletes a list
router.delete('/:listId', (req, res, next) => {
    List.findByIdAndDelete(req.params.listId)
        .then(foundList => {
            if (!foundList) {
                res.status(404);
                return res.send("No list found.");
            }
            res.status(200);
            return res.send("List deleted");
        }).catch(err => {
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
            res.status(500);
            return next(err);
        });
});

// resets all repeated list items
router.put('/:listId/reset', (req, res, next) => {
    List.updateMany({ user: req.auth._id }, { listItems: { isRepeated: true } })
        .then(lists => {
            res.status(200);
            return res.send(lists);
        }).catch(err => {
            res.status(500);
            return next(err);
        });
});

// // toggles pinned list
router.put('/list/:listId/pin', (req, res, next) => {
    List.find({ user: req.auth._id })
        .then(lists => {
            const requestedList = lists.find(list => list._id.toString() === req.params.listId);
            console.log("this is the list before: " + requestedList);

            if (requestedList.isPinned) {
                // unpin

                requestedList.isPinned = false;
                requestedList.save()
                    .then(response => {
                        res.status(200);
                        return res.send(response);
                    })
                    .catch(err => {
                        res.status(500);
                        return next(err);
                    });
            } else {
                // pin it

                // unpins previously pinned list
                List.findOneAndUpdate(
                    { user: req.auth._id, isPinned: true },
                    { isPinned: false }
                ).catch(err => {
                    res.status(500);
                    return next(err);
                });

                requestedList.isPinned = true;
                console.log("after : " + requestedList);
                requestedList.save()
                    .then(response => {
                        res.status(200);
                        // response is returning correctly, but isnt saving somehow to the db.
                        // after is conssistant wih response
                        console.log("response: " + response);
                        return res.send("List pinned.");
                    })
                    .catch(err => {
                        res.status(500);
                        return next(err);
                    });
            }
        })
        .catch(err => {
            res.status(500);
            return next(err);
        });
});

// adds a new item to a list
router.post('/:listId/new-item', (req, res, next) => {

    List.findOneAndUpdate(
        { user: req.auth._id, _id: req.params.listId },
        { $push: { listItems: req.body } },
        { new: true })
        .then(foundList => {
            res.status(201);
            return res.send(foundList);

        }).catch(err => {
            res.status(500);
            return next(err);
        });
});

// updates item
router.put('/list/:listId/item/:itemId/update', (req, res, next) => {

    List.findById(req.params.listId)
        .then(list => {

            if (!list) {
                res.send(404);
                return next(new Error("No list was found."));
            }
            const index = list.listItems.findIndex(item => item._id.toString() === req.params.itemId);
            list.listItems[index][req.body.key] = req.body.value;

            list.save()
                .then(response => {
                    res.status(200);
                    return res.send(response);
                }).catch(err => {
                    res.status(500);
                    return next(err);
                });

        }).catch(err => {
            res.status(500);
            return next(err);
        });
});

// deletes list items
router.delete('/list/:listId/item/:itemId', (req, res, next) => {
    List.findOneAndUpdate(
        { _id: req.params.listId },
        { $pull: { listItems: { _id: req.params.itemId } } },
        { new: true })
        .then(newList => {
            res.status(200);
            return res.send(newList);
        }).catch(err => {
            res.status(500);
            return next(err);
        });
});

module.exports = router;