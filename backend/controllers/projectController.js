const Project = require('../models/project');

const createProject = async (req, res) => {
  try {
    const { name, description, deadline, teamMembers } = req.body;

    const project = await Project.create({
      name,
      description,
      deadline,
      teamMembers,
      createdBy: req.user.userId 
    });

    res.status(201).json({ message: 'Project created', project });
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('teamMembers', 'name email role')
      .populate('createdBy', 'name email');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json({ message: 'Project updated', project: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  updateProject,
  deleteProject
};