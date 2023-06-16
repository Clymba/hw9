const db = require('../db');

class GroupController {
  async creategroup(req, res) {
    try {
      const { code_group, fk_code_course, name_c } = req.body;

      const existinggroup = await db.query('SELECT * FROM group_users WHERE code_group = $1', [code_group]);

      if (existinggroup.rows.length > 0) {
        return res.status(400).json({ error: 'Такая группа уже существует' });
      }

      const newCat = await db.query('INSERT INTO group_users (code_group, fk_code_course, name_c) values ($1, $2, $3) RETURNING *', [code_group, fk_code_course, name_c]);

      res.json(newCat.rows);
    } catch (error) {
      console.error('Error creating group:', error);
      res.status(500).json({ error: 'Произошла ошибка при создании группы' });
    }
  }

  async getgroup(req, res) {
    try {
      const group = await db.query('SELECT * FROM group_users');
      res.json(group.rows);
    } catch (error) {
      console.error('Error retrieving groups:', error);
      res.status(500).json({ error: 'Произошла ошибка при получении группы' });
    }
  }

  async getOnegroup(req, res) {
    try {
      const code_group = req.params.code_group;
      const onegroup = await db.query('SELECT * FROM group_users where code_group = $1', [code_group]);

      if (onegroup.rows.length === 0) {
        return res.status(404).json({ error: 'Группа не найдена' });
      }

      res.json(onegroup.rows[0]);
    } catch (error) {
      console.error('Error retrieving group:', error);
      res.status(500).json({ error: 'Произошла ошибка при получении группы' });
    }
  }

  async updategroup(req, res) {
    try {
      const { code_group, name_c } = req.body;

      const existinggroup = await db.query('SELECT * FROM group_users WHERE code_group = $1', [code_group]);

      if (existinggroup.rows.length === 0) {
        return res.status(404).json({ error: 'Группа не найдена' });
      }

      const updategroup = await db.query('UPDATE group_users set name_c = $1 where code_group = $2 RETURNING *', [name_c, code_group]);

      res.json(updategroup.rows[0]);
    } catch (error) {
      console.error('Error updating group:', error);
      res.status(500).json({ error: 'Произошла ошибка при обновлении группы' });
    }
  }

  async deletegroup(req, res) {
    try {
      const code_group = req.params.code_group;

      const deletegroup = await db.query('DELETE FROM group_users where code_group = $1 RETURNING *', [code_group]);

      if (deletegroup.rows.length === 0) {
        return res.status(404).json({ error: 'Группа не найдена' });
      }

      res.json(deletegroup.rows[0]);
    } catch (error) {
      console.error('Error deleting group:', error);
      res.status(500).json({ error: 'Произошла ошибка при удалении группы' });
    }
  }
}

module.exports = new GroupController();
