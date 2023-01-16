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
    User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
},
//updateUser route which updates a user
updateUser(req, res) {
User.findOneAndUpdate(
    { _id: req.params.courseId },
    { $set: req.body },
    { runValidators: true, new: true }
)
.then((user) => 
    !user
        ? res.status(404).json({ message: 'No user with this Id.' })
        :res.json(user)
)
.catch((err) => res.status(500).json(err))
},
//deleteUser route which deletes a user
deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user with that Id.' })
                : Thought.deleteMany({ _id: { $in: user.thoughts } })
        )
        .then(() => res.json({ message: 'User with thoughts have been deleted.' }))
        .catch((err) => res.status(500).json(err));
},
//addFriend route which adds a friend to a user
addFriend(req, res) {
User.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: { friends: req.params.friendId }},
    { runValidators: true, new:true }
)
    .then((user) => 
        !user  
            ?res
                .status(404)
                .json({ message: 'No user found with this Id. '})
            : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
},
//deleteFriend which deletes a friend per user
deleteFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
    )
        .then((user) =>
            !user
                ? res
                    .status(400)
                    .json({ message: 'No user found with this Id.' })
                :res.json(user)
            )
            .catch((err) => res.status(500).json(err));
},
};