const { User, Thought } = require('../models');

module.exports = {
//getUser route which finds a user
getUser(req, res) {
    User.find({})
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
},
//getSingleUser route which finds a single user
getSingleUser(req, res) {

},
//createUser route which creates a single user
createUser(req, res) {

},
//updateUser route which updates a user
updateUser(req, res) {

},
//deleteUser route which deletes a user
deleteUser(req, res) {

},
//addFriend route which adds a friend to a user
addFriend(req, res) {

},
//deleteFriend which deletes a friend per user
deleteFriend(req, res) {

},
};