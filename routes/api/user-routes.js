const router = require('express').Router();

const {
    createUser,
    updateUserById,
    getUserById,
    getAllUsers,
    addFriend,
    deleteUserById,
    removeFriend,

} = require('../../controllers/user-controller');

router.route('/').get(getAllUsers).post(createUser);

router
    .route('/:userId')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById)

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router;