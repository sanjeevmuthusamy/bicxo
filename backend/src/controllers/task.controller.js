const {
  createTask,
  findAllTasks,
  updateTask,
  updateTaskStatus
} = require('../models/task.model');
const { createHttpError } = require('../utils/http-error');
const { validateStatus, validateTaskPayload } = require('../utils/task-validation');

async function getTasks(req, res, next) {
  try {
    const tasks = await findAllTasks();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
}

async function postTask(req, res, next) {
  try {
    const errors = validateTaskPayload(req.body);

    if (errors.length) {
      throw createHttpError(400, errors.join(' '));
    }

    const task = await createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
}

async function putTask(req, res, next) {
  try {
    const errors = validateTaskPayload(req.body);

    if (errors.length) {
      throw createHttpError(400, errors.join(' '));
    }

    const task = await updateTask(req.params.id, req.body);

    if (!task) {
      throw createHttpError(404, 'Task not found.');
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
}

async function patchTaskStatus(req, res, next) {
  try {
    if (!validateStatus(req.body.status)) {
      throw createHttpError(400, 'Status must be To Do, In Progress, or Done.');
    }

    const task = await updateTaskStatus(req.params.id, req.body.status);

    if (!task) {
      throw createHttpError(404, 'Task not found.');
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getTasks,
  patchTaskStatus,
  postTask,
  putTask
};
