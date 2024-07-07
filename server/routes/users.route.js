const express = require('express');
const { AddUser, FindAllUsers, FindSingleUser, UpdateUser, DeleteUser } = require('../controllers/users.controllers');
const router = express.Router();

/* add user*/
router.post('/users',AddUser)

/* find all users */
router.get('/users',FindAllUsers)

/* find single user */
router.get('/users/:id',FindSingleUser)

/* update user */
router.put('/users/:id',UpdateUser)

/* delete user */
router.delete('/users/:id',DeleteUser)
module.exports = router;