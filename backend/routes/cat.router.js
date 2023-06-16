const Router = require('express')
const router = new Router()
const CatController = require('../controller/cat.controller')

router.post('/category_of_account', CatController.createCategory)
router.get('/category_of_account', CatController.getCategory)
router.get('/category_of_account/:code_category', CatController.getOneCategory)
router.put('/category_of_account', CatController.updateCategory)
router.delete('/category_of_account/:code_category', CatController.deleteCategory)

module.exports = router