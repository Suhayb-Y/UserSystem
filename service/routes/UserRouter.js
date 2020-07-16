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

router.get('/:id', userGet);

router.put('/:id', userUpdate);

router.post('/', userCreate);

router.delete('/:id', userDelete);

module.exports = router;