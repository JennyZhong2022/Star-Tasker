const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questions')
const isAuthenticated = require('../config/ensureLoggedIn');

router.post('/tasks/:id/questions', isAuthenticated,questionController.create);

router.delete('/questions/:id', isAuthenticated, questionController.delete)

router.get('/questions/:id/edit',questionController.edit)

router.put('/questions/:id',questionController.update)


module.exports=router