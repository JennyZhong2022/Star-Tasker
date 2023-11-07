const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;


const locationSchema = new Schema({
  longitude: Number,
  latitude: Number,
});

const questionSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required:true
  },
  userName: String,
  userAvatar:String
}, {
  timestamps: true
});

const taskSchema = new Schema({
  myPost: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required:true
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: function () {
      return new Date()
    }
  },
  location: [locationSchema],
  details:  {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  questions: [questionSchema],
  budget: {
    type: Number,
    required:true
  },
  acceptedTasks: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required:true
  }],
  
},
  {timestamps:true});

  
  module.exports = mongoose.model('Task', taskSchema);