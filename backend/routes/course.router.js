const Router = require('express')
const router = new Router()
const CourseController = require('../controller/course.controller')

router.post('/course', CourseController.createcourse)
router.get('/course', CourseController.getcourse)
router.get('/course/:code_course', CourseController.getOnecourse)
router.put('/course', CourseController.updatecourse)
router.delete('/course/:code_course', CourseController.deletecourse)

module.exports = router