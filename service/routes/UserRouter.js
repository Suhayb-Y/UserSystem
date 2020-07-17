const express = require('express');
const jwt = require('express-jwt');
const cookieParser = require('cookie-parser');
const {
    getJWT,
    userGet,
    userUpdate,
    userList,
    userCreate,
    userLogin,
    userDelete
} = require('../controllers/UserController');

require('dotenv').config();

const router = express.Router();

//JWT Authentication
router.use(cookieParser());
const appJWT = jwt({
    secret: process.env.JWT_SECRET,
    // Audience+issuer can be anything...
    // audience: 'api.cansheep.ca',
    // issuer: 'sso.cansheep.ca',
    algorithms: ['HS256'],
    getToken: (req) => req.cookies.token
});

router.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(403).send({
            success: false,
            message: 'Invalid/missing token!'
        });
    }
});

router.get('/jwt/get', getJWT);

router.get('/:email', userGet);

router.put('/:email', appJWT, userUpdate);

router.post('/register', userCreate);

router.post('/login', userLogin);

router.delete('/:email', appJWT, userDelete);

router.get('/', appJWT, userList);

module.exports = router;