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

},
//add createThought route
createThought(req, res) {

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