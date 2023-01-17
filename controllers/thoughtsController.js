const { User, Thought } = require('../models');

module.exports = {
//add getThought route
getThought(req, res) {
Thought.find({})
    .then((thought) => res.json(thought))
    .catch((err) => res.status(500).json(err));
},
//add getSingleThought route
getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .lean()
        .then(async (thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought with that Id found.' })
                : res.json(thought)
                )
                .catch((err) => res.status(500).json(err));
},
//add createThought route
createThought(req, res) {
    Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err))
},
//add updateThought route
updateThought(req, res) {
    Thought.findOneAndDelete(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought with that Id.' })
                : res.json(thought)
                )
                .catch((err) => res.status(500).json(err));
},
//add deleteThough route
deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No thought with that Id.' })
            : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
                )
            )
            .then((user) => 
            !user
                ? res.status(404).json({ message: 'Thought deleted, but no User was found.'})
                : res.json({ message: 'Thought was deleted successfully.'})
                )
                .catch((err) => res.status(500).json(err));
},
//add createReaction route
createReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
    )
    .then((thought) => 
        !thought
            ? res.status(404).json({ message: 'No thought found with that Id.' })
            :res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
},
//add deleteReaction route
deleteReaction(req, res) {

},
};