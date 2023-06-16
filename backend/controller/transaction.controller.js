const db = require('../db')

class TransactionController {
    async getTeacher(req, res) {
        const Query = await db.query('SELECT COUNT(*) AS teacher_count FROM supervisor');   
        res.json(Query.rows);
    }
}

module.exports = new TransactionController()