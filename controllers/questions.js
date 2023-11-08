const Task = require('../models/task');

const create = async(req,res) => {
  const task = await Task.findById(req.params.id)
  req.body.user = req.user._id;
  req.body.UserName=req.user.name
  req.body.userAvatar = req.user.avatar
  task.questions.push(req.body)
  try { 
    await task.save()
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/tasks/${task._id}`)
}

const deleteReview = async (req, res) => {
  const task=await Task.findOne({'questions._id':req.params.id,'questions.user':req.user._id})
  task.questions.remove(req.params.id)
  await task.save()
  res.redirect(`/tasks/${task._id}`)
}

const edit = async (req, res) => {
  const task = await Task.findOne({ 'questions._id':req.params.id })
  const question = task.questions.id(req.params.id)
  res.render('questions/edit',{title: 'Edit Question',question})
}

const update = async (req, res) => {
  const task = await Task.findOne({ 'questions._id': req.params.id })
  const question = task.questions.id(req.params.id)
  question.content=req.body.content
  try {
    await task.save()
  }
  catch (err) {
    console.log(err);
 }
  res.redirect(`/tasks/${task._id}`)
}

module.exports = {
  create,delete:deleteReview,edit,update
}