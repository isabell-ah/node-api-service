const express = require('express');
const tasksController = require('../controllers/tasksController'); // Importing the module
const router = express();
// Destructuring the functions from the imported module
const { getAllTasks, createTask, getTask, updateTask, deleteTask } =
  tasksController;

// router.get('/', getAllTasks);
// router.post('/', createTask);
// router.get('/:id', getTask);
// router.patch('/:id', updateTask);
// router.delete('/:id', deleteTask);

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
