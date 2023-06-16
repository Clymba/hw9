const Router = require('express')
const router = new Router()
const GroupController = require('../controller/group.controller')

router.post('/group', GroupController.creategroup)
router.get('/group', GroupController.getgroup)
router.get('/group/:code_group', GroupController.getOnegroup)
router.put('/group', GroupController.updategroup)
router.delete('/group/:code_group', GroupController.deletegroup)

module.exports = router