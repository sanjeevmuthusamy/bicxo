const { Router } = require('express');

const {
  getTasks,
  patchTaskStatus,
  postTask,
  putTask
} = require('../controllers/task.controller');

const router = Router();

router.get('/', getTasks);
router.post('/', postTask);
router.put('/:id', putTask);
router.patch('/:id/status', patchTaskStatus);

module.exports = router;
