const Router = require('express')
const router = new Router()
const SupervisorController = require('../controller/supervisor.controller')

router.post('/supervisor', SupervisorController.createSupervisor)
router.get('/supervisor', SupervisorController.getSupervisor)
router.get('/supervisor/:code_supervisor', SupervisorController.getOneSupervisor)
router.put('/supervisor', SupervisorController.updateSupervisor)
router.delete('/supervisor/:code_supervisor', SupervisorController.deleteSupervisor)

module.exports = router