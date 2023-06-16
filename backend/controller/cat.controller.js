const db = require('../db');

class CatController {
  async createCategory(req, res) {
    try {
      const { code_category, name_c } = req.body;

      const existingCategory = await db.query('SELECT * FROM category_of_account WHERE code_category = $1', [code_category]);

      if (existingCategory.rows.length > 0) {
        return res.status(400).json({ error: 'Такая категория уже существует' });
      }

      const newCat = await db.query('INSERT INTO category_of_account (code_category, name_c) values ($1, $2) RETURNING *', [code_category, name_c]);

      res.json(newCat.rows);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: 'Произошла ошибка при создании категории' });
    }
  }

  async getCategory(req, res) {
    try {
      const category = await db.query('SELECT * FROM category_of_account');
      res.json(category.rows);
    } catch (error) {
      console.error('Error retrieving categories:', error);
      res.status(500).json({ error: 'Произошла ошибка при получении категорий' });
    }
  }

  async getOneCategory(req, res) {
    try {
      const code_category = req.params.code_category;
      const oneCategory = await db.query('SELECT * FROM category_of_account where code_category = $1', [code_category]);

      if (oneCategory.rows.length === 0) {
        return res.status(404).json({ error: 'Категория не найдена' });
      }

      res.json(oneCategory.rows[0]);
    } catch (error) {
      console.error('Error retrieving category:', error);
      res.status(500).json({ error: 'Произошла ошибка при получении категории' });
    }
  }

  async updateCategory(req, res) {
    try {
      const { code_category, name_c } = req.body;

      const existingCategory = await db.query('SELECT * FROM category_of_account WHERE code_category = $1', [code_category]);

      if (existingCategory.rows.length === 0) {
        return res.status(404).json({ error: 'Категория не найдена' });
      }

      // Check for dependencies before updating
      const hasDependencies = await db.query('SELECT * FROM user_ WHERE fk_code_category = $1', [code_category]);

      if (hasDependencies.rows.length > 0) {
        return res.status(400).json({ error: 'Невозможно обновить категорию, так как существуют зависимости' });
      }

      const updateCategory = await db.query('UPDATE category_of_account set name_c = $1 where code_category = $2 RETURNING *', [name_c, code_category]);

      res.json(updateCategory.rows[0]);
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ error: 'Произошла ошибка при обновлении категории' });
    }
  }

  async deleteCategory(req, res) {
    try {
      const code_category = req.params.code_category;

      // Check for dependencies before deleting
      const hasDependencies = await db.query('SELECT * FROM user_ WHERE fk_code_category = $1', [code_category]);

      if (hasDependencies.rows.length > 0) {
        return res.status(400).json({ error: 'Невозможно удалить категорию, так как существуют зависимости' });
      }

      const deleteCategory = await db.query('DELETE FROM category_of_account where code_category = $1 RETURNING *', [code_category]);

      if (deleteCategory.rows.length === 0) {
        return res.status(404).json({ error: 'Категория не найдена' });
      }

      res.json(deleteCategory.rows[0]);
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ error: 'Произошла ошибка при удалении категории' });
    }
  }
}

module.exports = new CatController();
