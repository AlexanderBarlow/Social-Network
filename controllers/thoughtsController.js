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

},
//add deleteThough route
deletThought(req, res) {

},
//add createReaction route
createReaction(req, res) {

},
//add deleteReaction route
deleteReaction(req, res) {

},
};