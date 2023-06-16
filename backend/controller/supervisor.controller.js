const db = require('../db');

class SupervisorController {
  async createSupervisor(req, res) {
    try {
      const { code_supervisor, fk_code_user, education, profile_education, time_hours } = req.body;

      // Check if supervisor with the given code_supervisor already exists
      const existingSupervisor = await db.query('SELECT * FROM supervisor WHERE code_supervisor = $1', [code_supervisor]);
      if (existingSupervisor.rows.length > 0) {
        return res.status(400).json({ error: 'Supervisor with the same code already exists' });
      }

      // TODO: Perform additional checks if necessary before creating the supervisor

      const newSupervisor = await db.query(
        'INSERT INTO supervisor (code_supervisor, fk_code_user, education, profile_education, time_hours) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [code_supervisor, fk_code_user, education, profile_education, time_hours]
      );

      res.json(newSupervisor.rows);
    } catch (error) {
      console.error('Error creating supervisor:', error);
      res.status(500).json({ error: 'An error occurred while creating supervisor' });
    }
  }

  async getSupervisor(req, res) {
    try {
      const supervisors = await db.query('SELECT * FROM supervisor');
      res.json(supervisors.rows);
    } catch (error) {
      console.error('Error retrieving supervisors:', error);
      res.status(500).json({ error: 'An error occurred while retrieving supervisors' });
    }
  }

  async getOneSupervisor(req, res) {
    try {
      const code_supervisor = req.params.code_supervisor;
      const oneSupervisor = await db.query('SELECT * FROM supervisor WHERE code_supervisor = $1', [code_supervisor]);

      if (oneSupervisor.rows.length === 0) {
        return res.status(404).json({ error: 'Supervisor not found' });
      }

      res.json(oneSupervisor.rows[0]);
    } catch (error) {
      console.error('Error retrieving supervisor:', error);
      res.status(500).json({ error: 'An error occurred while retrieving supervisor' });
    }
  }

  async updateSupervisor(req, res) {
    try {
      const { code_supervisor, education } = req.body;

      // Check if supervisor with the given code_supervisor exists
      const existingSupervisor = await db.query('SELECT * FROM supervisor WHERE code_supervisor = $1', [code_supervisor]);
      if (existingSupervisor.rows.length === 0) {
        return res.status(404).json({ error: 'Supervisor not found' });
      }

      const updatedSupervisor = await db.query(
        'UPDATE supervisor SET education = $1 WHERE code_supervisor = $2 RETURNING *',
        [education, code_supervisor]
      );

      res.json(updatedSupervisor.rows[0]);
    } catch (error) {
      console.error('Error updating supervisor:', error);
      res.status(500).json({ error: 'An error occurred while updating supervisor' });
    }
  }

  async deleteSupervisor(req, res) {
    try {
      const code_supervisor = req.params.code_supervisor;

      // Check if supervisor with the given code_supervisor exists
      const existingSupervisor = await db.query('SELECT * FROM supervisor WHERE code_supervisor = $1', [code_supervisor]);
      if (existingSupervisor.rows.length === 0) {
        return res.status(404).json({ error: 'Supervisor not found' });
      }

      const deletedSupervisor = await db.query('DELETE FROM supervisor WHERE code_supervisor = $1 RETURNING *', [code_supervisor]);

      res.json(deletedSupervisor.rows[0]);
    } catch (error) {
      console.error('Error deleting supervisor:', error);
      res.status(500).json({ error: 'An error occurred while deleting supervisor' });
    }
  }

  // ...

    }


module.exports = new SupervisorController();