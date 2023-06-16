const db = require('../db');

class CourseController {
  async createcourse(req, res) {
    try {
      const {code_course, date_of_start, date_of_end, type_of_cousre, status_of_course} = req.body;

      const existingcourse = await db.query('SELECT * FROM course WHERE code_course = $1', [code_course]);

      if (existingcourse.rows.length > 0) {
        return res.status(400).json({ error: 'Такой курс уже существует' });
      }

      const newCourse = await db.query('INSERT INTO course (code_course, date_of_start, date_of_end, type_of_cousre, status_of_course) values ($1, $2, $3, $4, $5) RETURNING *', [code_course, date_of_start, date_of_end, type_of_cousre, status_of_course]);

      res.json(newCourse.rows);
    } catch (error) {
      console.error('Error creating course:', error);
      res.status(500).json({ error: 'Произошла ошибка при создании курса' });
    }
  }

  async getcourse(req, res) {
    try {
      const course = await db.query('SELECT * FROM course');
      res.json(course.rows);
    } catch (error) {
      console.error('Error retrieving course:', error);
      res.status(500).json({ error: 'Произошла ошибка при получении курсов' });
    }
  }

  async getOnecourse(req, res) {
    try {
      const code_course = req.params.code_course;
      const onecourse = await db.query('SELECT * FROM course where code_course = $1', [code_course]);

      if (onecourse.rows.length === 0) {
        return res.status(404).json({ error: 'Курс не найден' });
      }

      res.json(onecourse.rows[0]);
    } catch (error) {
      console.error('Error retrieving course:', error);
      res.status(500).json({ error: 'Произошла ошибка при получении курсов' });
    }
  }

  async updatecourse(req, res) {
    try {
      const { code_course, type_of_cousre } = req.body;

      const existingcourse = await db.query('SELECT * FROM course WHERE code_course = $1', [code_course]);

      if (existingcourse.rows.length === 0) {
        return res.status(404).json({ error: 'Курс не найден' });
      }

      // Check for dependencies before updating
      const hasDependencies = await db.query('SELECT * FROM group_users WHERE fk_code_course = $1', [code_course]);

      if (hasDependencies.rows.length > 0) {
        return res.status(400).json({ error: 'Невозможно обновить курс, так как существуют зависимости' });
      }

      const updatecourse = await db.query('UPDATE course set type_of_cousre = $1 where code_course = $2 RETURNING *', [type_of_cousre, code_course]);

      res.json(updatecourse.rows[0]);
    } catch (error) {
      console.error('Error updating course:', error);
      res.status(500).json({ error: 'Произошла ошибка при обновлении курса' });
    }
  }

  async deletecourse(req, res) {
    try {
      const code_course = req.params.code_course;

      // Check for dependencies before deleting
      const hasDependencies = await db.query('SELECT * FROM group_users WHERE fk_code_course = $1', [code_course]);

      if (hasDependencies.rows.length > 0) {
        return res.status(400).json({ error: 'Невозможно удалить курс, так как существуют зависимости' });
      }

      const deletecourse = await db.query('DELETE FROM course where code_course = $1 RETURNING *', [code_course]);

      if (deletecourse.rows.length === 0) {
        return res.status(404).json({ error: 'Курс не найден' });
      }

      res.json(deletecourse.rows[0]);
    } catch (error) {
      console.error('Error deleting course:', error);
      res.status(500).json({ error: 'Произошла ошибка при удалении курса' });
    }
  }
}

module.exports = new CourseController();
