const Router = require('express')
const router = new Router()
const TransactionController = require('../controller/transaction.controller')


router.get('/view_teacher_count', TransactionController.getTeacher)


module.exports = router