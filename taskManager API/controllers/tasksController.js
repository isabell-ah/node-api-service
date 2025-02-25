const { reset } = require('nodemon');
const Task = require('../models/taskModel');
const Tasks = require('../models/taskModel');
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find();

    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createTask = async (req, res) => {
  try {
    const tasks = await Tasks.create(req.body);
    res.status(201).json({ tasks });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const getTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Tasks.findOne({ _id: taskId });
    !task
      ? res.status(404).json({ msg: `No task with the id:${taskId} ` })
      : res.status(200).json({ task });
    // !task && res.status(404).json({ msg: `No task with the id:${taskId} ` });
    // if (!task) {
    //   return res.status(400).json({ msg: `No task with id :${taskId} ` });
    // }
    // res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Tasks.findOneAndDelete({ _id: taskId });
    if (!task) {
      return res.status(404).json({ msg: `No task with the id:${taskId} ` });
    }
    res.status(200).json({ msg: `The task is deleted successfully`, task });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Tasks.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    });
    !task
      ? res.status(404).json({ msg: `No task with the id:${taskId} ` })
      : res.status(200).json({ msg: ` Task successfully updated`, task });

    // res.status(200).json({ id: taskId, data: req.body });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { getAllTasks, getTask, createTask, deleteTask, updateTask };
