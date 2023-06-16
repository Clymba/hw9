const Router = require('express')
const router = new Router()
const ListController = require('../controller/list_of_users.controller')

router.post('/list_of_users', ListController.createlist)
router.put('/list_of_users', ListController.updatelist)

module.exports = router