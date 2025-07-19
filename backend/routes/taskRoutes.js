const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');


router.post('/', protect, authorizeRoles('Admin', 'Project-Manager'), createTask);


router.get('/', protect, getTasks);


router.put('/:id', protect, authorizeRoles('Admin', 'Project-Manager'), updateTask);


router.delete('/:id', protect, authorizeRoles('Admin'), deleteTask);

module.exports = router;