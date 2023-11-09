const Task = require('../models/task');

const index = async(req,res)=> {
  try {
    const tasks = await Task.find({ myPost: req.user._id });
    res.render('tasks/index', { title: 'My Task', titleSearch: req.query.title || '' ,showSearchForm: false,tasks });
  } catch (err) {
    console.log(err);
    res.render('error', { errMsg: err.message });
  }
};         

const allTasks = async (req, res) => {

    const tasks = await Task.find({});
    res.render('tasks/index', { title: 'All Tasks',titleSearch: req.query.title || '',showSearchForm: true,tasks });

}

const show = async (req,res) => {
  const task = await Task.findById(req.params.id).populate('questions')
  
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



const deleteTask =async (req,res) => {
  await Task.findOneAndDelete(

    {
      _id:req.params.id, myPost : req.user._id
    } )
    res.redirect('/tasks')
}


const edit = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, myPost: req.user._id })
  if (!task) return res.redirect('/tasks')
  res.render('tasks/edit',{title: 'Edit Task',task})
}


const update = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate({ _id: req.params.id, myPost: req.user._id },
      req.body,
      {new:true}
    
    ) 
    
   res.redirect(`/tasks/${updatedTask._id}`)
   
   } catch (err) {
    console.log(err.message);
 res.redirect('/tasks')
 }
}
 

const addAccept = async(req,res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    // Handle the case where the task is not found
    return res.redirect('/tasks');
  }
  if (task.acceptedTasks.includes(req.user._id)) {
    // The user has already added this task to their reading list
    return res.redirect('/tasks/my-accept-list');
  }
  task.acceptedTasks.push(req.user._id);
  await task.save();
  res.redirect(`/tasks/${task._id}`);
};

const cancelAccept=async(req,res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    // Handle the case where the task is not found
    return res.redirect('/tasks');
  }
  task.acceptedTasks = task.acceptedTasks.filter(userId => !userId.equals(req.user._id));
  await task.save();
  res.redirect(`/tasks/${task._id}`);
};

const showAcceptList =async (req,res) => {
  const tasks = await Task.find({acceptedTasks: req.user._id })
  res.render('tasks/accept',{title:'My Accept',tasks})
}


const searchedTasks = async (req,res) => {
  let taskQuery = req.query.title ? { title: new RegExp(req.query.title, 'i') } : {}
  const tasks = await Task.find(taskQuery)
  res.render('tasks/index', {
    title: 'Search Title', tasks,
    showSearchForm: true,titleSearch: req.query.title
  })
}

module.exports = {
  index,show,new:newTask,create,allTasks,searchedTasks,showAcceptList,addAccept,update,edit,delete:deleteTask,cancelAccept
}