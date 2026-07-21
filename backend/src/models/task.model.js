const { pool } = require('../config/db');

async function findAllTasks() {
  const result = await pool.query(
    `SELECT id, title, description, priority, status, assignee_id, created_at, updated_at
     FROM tasks
     ORDER BY created_at DESC`
  );

  return result.rows;
}

async function createTask(task) {
  const result = await pool.query(
    `INSERT INTO tasks (title, description, priority, status, assignee_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, title, description, priority, status, assignee_id, created_at, updated_at`,
    [
      task.title.trim(),
      task.description.trim(),
      task.priority,
      task.status || 'To Do',
      task.assigneeId || null
    ]
  );

  return result.rows[0];
}

async function updateTask(id, task) {
  const result = await pool.query(
    `UPDATE tasks
     SET title = $1,
         description = $2,
         priority = $3,
         status = $4,
         assignee_id = $5
     WHERE id = $6
     RETURNING id, title, description, priority, status, assignee_id, created_at, updated_at`,
    [
      task.title.trim(),
      task.description.trim(),
      task.priority,
      task.status || 'To Do',
      task.assigneeId || null,
      id
    ]
  );

  return result.rows[0];
}

async function updateTaskStatus(id, status) {
  const result = await pool.query(
    `UPDATE tasks
     SET status = $1
     WHERE id = $2
     RETURNING id, title, description, priority, status, assignee_id, created_at, updated_at`,
    [status, id]
  );

  return result.rows[0];
}

module.exports = {
  createTask,
  findAllTasks,
  updateTask,
  updateTaskStatus
};
