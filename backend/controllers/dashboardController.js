const Project = require('../models/project');
const Task = require('../models/task');

const getDashboardData = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const totalTasks = await Task.countDocuments();

    const taskStatusCounts = await Task.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const upcomingTasks = await Task.find({
      deadline: {
        $gte: new Date(),
        $lte: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
      }
    })
      .sort({ deadline: 1 })
      .select('title deadline status');

    res.status(200).json({
      totalProjects,
      totalTasks,
      taskStatusSummary: taskStatusCounts,
      upcomingTasks
    });
  } catch (error) {
    res.status(500).json({ message: 'Error loading dashboard', error: error.message });
  }
};

module.exports = { getDashboardData };