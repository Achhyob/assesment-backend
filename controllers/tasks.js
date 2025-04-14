const { Task } = require('../models');

const getTasks = async (req, res) => {
  try {
    // req.userId comes from auth middleware
    const tasks = await Task.findAll({ 
      where: { userId: req.userId } // Only get tasks for this user
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

const addTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({
      title,
      description,
      userId: req.userId // Associate task with user
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error adding task' });
  }
};

const deleteTask = async (req, res) => {
  try {
    // Ensure task belongs to user before deleting
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.destroy();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
};
module.exports = {
  getTasks,
  addTask,
  deleteTask
};