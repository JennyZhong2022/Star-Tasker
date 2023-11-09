const Task = require('../models/task');
const cloudinary= require('../utilities/cloudinary')

const index = async(req,res)=> {
  try {
    const tasks = await Task.find({ myPost: req.user._id }).sort({createdAt:-1});
    res.render('tasks/index', { title: 'My Task', titleSearch: req.query.title || '' ,showSearchForm: false,tasks });
  } catch (err) {
    console.log(err);
    res.render('error', { errMsg: err.message });
  }
};         

const allTasks = async (req, res) => {

    const tasks = await Task.find({}).sort({createdAt:-1});
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
    let imageUrls = [];
  let cloudinaryId = [];
  for (const file of req.files) {
    const result = await cloudinary.uploader.upload(file.path)
    imageUrls.push(result.secure_url);
    cloudinaryId.push(result.public_id)
  }
    const task = await Task.create({
      ...req.body,
      myPost: req.user._id,
      images: imageUrls,
      cloudinary_id: cloudinaryId
    })
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
    // Find the existing task first
    const task = await Task.findOne({_id: req.params.id, myPost: req.user._id});
    if (!task) {
      return res.redirect("/tasks");
    }

    // Initialize imageUrls and cloudinaryIds from the task if available
    let imageUrls = task.images || [];
    let cloudinaryIds = task.cloudinary_id || []; // This should match your schema for storing cloudinary IDs

    // Process the uploaded files, if any
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path); // Use 'result' to store the cloudinary response
        imageUrls.push(result.secure_url);
        cloudinaryIds.push(result.public_id);
      }
    }

    // Update the task with new information
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, myPost: req.user._id },
      {
        ...req.body,
        myPost: req.user._id,
        images: imageUrls,
        cloudinary_id: cloudinaryIds
      },
      {
        new: true,
        upsert: true // Be careful with upsert: it will create a new task if the original doesn't exist
      }
    );

    res.redirect(`/tasks/${updatedTask._id}`);
  } catch (err) {
    console.error(err.message);
    res.redirect('/tasks');
  }
};



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