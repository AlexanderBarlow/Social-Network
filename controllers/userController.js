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
    User.findOne({ _id: req.params.userId })
    .select('-__v')
    .lean()
    .then(async (user) => 
        !user
            ?res.status(404).json({ message: 'No user with this id was found.' })
            :res.json({user,})
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
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