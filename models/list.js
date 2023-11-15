const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = Schema({
    title: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100
    },
    description: {
        type: String,
        maxLength: 150
    },
    isRepeated: {
        type: Boolean,
        default: false
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
});

const ListSchema = Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    listItems: {
        type: [ItemSchema]
    },
    name: {
        type: String,
        require: true
    },
    isPinned: {
        type: Boolean,
        default: false
    }
});

const List = mongoose.model("List", ListSchema);
const Item = mongoose.model("Item", ItemSchema);
module.exports = { List, Item };