const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Protect all task routes
const { getTasks, addTask, deleteTask } = require('../controllers/tasks');

router.get('/', auth, getTasks);         // GET /api/tasks (protected)
router.post('/', auth, addTask);         // POST /api/tasks (protected)
router.delete('/:id', auth, deleteTask); // DELETE /api/tasks/:id (protected)

module.exports = router;