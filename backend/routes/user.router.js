const Router = require('express')
const router = new Router()
const UserController = require('../controller/user.controller')

router.post('/user', UserController.createUser)
router.get('/user', UserController.getUser)
router.get('/user/:code_user', UserController.getOneUser)
router.put('/user', UserController.updateUser)
router.delete('/user/:code_user', UserController.deleteUser)

module.exports = router