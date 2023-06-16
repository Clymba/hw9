const db = require('../db')

class ListController {
    async createlist(req, res) {
        const {fk_code_user, fk_code_group} = req.body
        const newlist = await db.query('INSERT INTO list_of_users (fk_code_user, fk_code_group) values ($1, $2, $3) RETURNING *', [fk_code_user, fk_code_group])
        res.json(newlist.rows)
    }
    async updatelist(req, res) {
        const {fk_code_group, fk_code_user} = req.body
        const updatelist = await db.query('UPDATE list_of_users set  = $1 where fk_code_user = $2 RETURNING *', [fk_code_group, fk_code_user])
        res.json(updatelist.rows[0])
    }
}

module.exports = new ListController()