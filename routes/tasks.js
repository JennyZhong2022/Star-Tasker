const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasks')
const isAuthenticated = require('../config/ensureLoggedIn');
const upload=require('../utilities/multer')

/* GET users listing. */
router.get('/',isAuthenticated,taskController.index);

router.get('/all', taskController.allTasks)
// original '/tasks/new
router.get('/new', isAuthenticated, taskController.new);

router.get('/my-accept-list', taskController.showAcceptList)

router.get('/searched-tasks',taskController.searchedTasks)

// GET /tasks/:id (show functionality) MUST be below new route
router.get('/:id', isAuthenticated,taskController.show)

router.post('/', isAuthenticated,upload.array('images',5), taskController.create)

router.delete('/:id',taskController.delete)

router.get('/:id/edit', taskController.edit)

router.put('/:id',isAuthenticated,upload.array('images',5), taskController.update)

router.post('/my-accept-list/:id', isAuthenticated,taskController.addAccept);

router.delete('/my-accept-list/:id', isAuthenticated,taskController.cancelAccept)

module.exports = router;