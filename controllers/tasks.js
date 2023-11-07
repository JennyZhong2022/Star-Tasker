const Task = require('../models/task');

const index = async(req,res)=> {
  try {
    const tasks = await Task.find({ myPost: req.user._id });
    res.render('tasks/index', { title: 'My Task', titleSearch: req.query.title || '' ,tasks });
  } catch (err) {
    console.log(err);
    res.render('error', { errMsg: err.message });
  }
};

const allTasks = async (req, res) => {

    const tasks = await Task.find({});
    res.render('tasks/index', { title: 'All Tasks',titleSearch: req.query.title || '',tasks });

}

const show = async (req,res) => {
  const task = await Task.findById(req.params.id).populate('location').populate('questions')
  
  res.render('tasks/show',{title: 'Task Details',task})
}

const newTask = (req,res) => {
  res.render('tasks/new',{title: 'Add Task',errMessage:''})
}

const create = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, myPost: req.user._id })
    res.redirect(`/tasks/${task._id}`)
  } catch (error) {
    console.log(error);
    res.render('tasks/new',{errorMessage:error.message})
  }
}
module.exports = {
  index,show,new:newTask,create,allTasks
}