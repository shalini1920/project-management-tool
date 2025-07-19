const express = require('express');
const router = express.Router();
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');


router.post('/', protect, authorizeRoles('Admin', 'Project-Manager','team-lead'), createProject);


router.get('/', protect, getProjects);


router.put('/:id', protect, authorizeRoles('Admin'), updateProject);


router.delete('/:id', protect, authorizeRoles('Admin'), deleteProject);

module.exports = router;