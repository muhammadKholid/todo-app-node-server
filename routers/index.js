let express = require('express');
let router = express.Router();

router.use('/activity-groups', require('./activity.router'));
router.use('/todo-items', require('./todo.router'));

module.exports = router;
