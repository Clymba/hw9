const db = require('../db');

class UserController {
  async createUser(req, res) {
    try {
      const {code_user, fk_code_category, e_mail, gender, name_, famille, patronymique} = req.body;
        const existinguser = await db.query('SELECT * FROM user_ WHERE code_user  = $1', [code_user]);
        if (existinguser.rows.length > 0) {
          return res.status(400).json({ error: 'user with the same code already exists' });
        }

        const existingEmail = await db.query('SELECT * FROM user_ WHERE e_mail  = $1', [e_mail]);
        if (existingEmail.rows.length > 0) {
          return res.status(400).json({ error: 'email with the same code already exists' });
        }

        const newuser = await db.query(
            'INSERT INTO user_ (code_user, fk_code_category, e_mail, gender, name_, famille, patronymique) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [code_user, fk_code_category, e_mail, gender, name_, famille, patronymique]
          );
        res.json(newuser.rows);
        } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'An error occurred while creating user' });
    }
  }

  async getUser(req, res) {
    try {
      const getUsers = await db.query('SELECT * FROM user_');
      res.json(getUsers.rows);
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(500).json({ error: 'An error occurred while retrieving users' });
    }
  }

  async getOneUser(req, res) {
    try {
      const code_user = req.params.code_user;
      const oneUser = await db.query('SELECT * FROM user_ where code_user = $1', [code_user]);

      if (oneUser.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(oneUser.rows[0]);
    } catch (error) {
      console.error('Error retrieving user:', error);
      res.status(500).json({ error: 'An error occurred while retrieving the user' });
    }
  }

  async updateUser(req, res) {
    try {

      const { code_user, name_ } = req.body;
      const existingUser = await db.query('SELECT * FROM user_ WHERE code_user = $1', [code_user]);

      if (existingUser.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      const updateUser = await db.query('UPDATE user_ SET name_ = $1 WHERE code_user = $2 RETURNING *', [name_, code_user]);
      res.json(updateUser.rows[0]);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'An error occurred while updating the user' });

    }
  }

  async deleteUser(req, res) {
    try {
      const code_user = req.params.code_user;
      const existingUser = await db.query('SELECT * FROM user_ WHERE code_user = $1', [code_user]);

      if (existingUser.rows.length === 0) {
        return res.status(404).json({ error: 'Не найден' });
      }

      const hasDependencies = await db.query('SELECT * FROM supervisor WHERE fk_code_user = $1', [code_user]);

      if (hasDependencies.rows.length > 0) {
        return res.status(400).json({ error: 'Невозможно удалить пользователя, так как существуют зависимости' });
      }

      const delUser = await db.query('DELETE FROM user_ WHERE code_user = $1 RETURNING *', [code_user]);
      res.json(delUser.rows[0]);
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
  }
}

module.exports = new UserController();