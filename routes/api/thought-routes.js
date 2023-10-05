const router = require('express').Router();

const {
    createThought,
    getThoughtById,
    updateThoughtById,
    getAllThoughts,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thought-controller');

router.route('/').get(getAllThoughts).post(createThought);

router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThoughtById)
    .delete(deleteThought)

router
    .route('/:thoughtId/reactions')
    .post(createReaction);

router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)

module.exports = router;