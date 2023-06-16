const db = require('../db');

// Вызов хранимой процедуры
const getSupervisorByEducation = async (req, res) => {
  try {
    const { education } = req.params;

    // Выполнение хранимой процедуры и получение результатов
    const result = await db.query('SELECT * FROM getSupervisorByEducation($1)', [education]);

    // Отправка результатов клиенту
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing stored procedure:', error);
    res.status(500).json({ error: 'An error occurred while executing the stored procedure' });
  }
};

module.exports = {getSupervisorByEducation};