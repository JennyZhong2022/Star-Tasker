const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasks')
const isAuthenticated = require('../config/ensureLoggedIn');

/* GET users listing. */
router.get('/',isAuthenticated,taskController.index);

router.get('/all', taskController.allTasks)
// original '/tasks/new
router.get('/new', isAuthenticated, taskController.new);
// GET /tasks/:id (show functionality) MUST be below new route
router.get('/:id', taskController.show)

router.post('/', isAuthenticated,taskController.create)


module.exports = router;