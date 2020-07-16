const express = require('express');
const {
    userGet,
    userUpdate,
    userList,
    userCreate,
    userDelete
} = require('../controllers/UserController');

const router = express.Router();

router.get('/', userList);

router.get('/:email', userGet);

router.put('/:email', userUpdate);

router.post('/', userCreate);

router.delete('/:email', userDelete);

module.exports = router;