const express = require('express');
const router = express.Router();
const { getSupervisorByEducation } = require('../controller/func.controller');

// Маршрут для вызова хранимой процедуры
router.get('/supervisors/education/:education', getSupervisorByEducation);

module.exports = router;