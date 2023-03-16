const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 2,
        maxLength: 20
    },
    preferedTheme: {
        type: String,
        default: "HOUSEPLANT",
        enum: ["NIGHT", "HOUSEPLANT"]
    },
    password: {
        type: String,
        require: true
    }
});

// returns user without password
UserSchema.methods.withoutPassword = function () {
    user = this.toObject();
    delete user.password;
    return user;
};

UserSchema.methods.checkPassword = function (userAttempt, callback) {

    if (userAttempt !== this.password) {
        return callback(new Error('Username or Passward are incorrect'));
    }
    return callback(null, true);
};

module.exports = mongoose.model("User", UserSchema);