const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'bicxo-sprint-board-api'
  });
});

module.exports = router;
