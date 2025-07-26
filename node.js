const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS for frontend-backend communication
app.use(bodyParser.json()); // Parse JSON request bodies

// In-memory storage for tasks
let tasks = [];
let idCounter = 1;

// Routes

// 1. Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// 2. Add a new task
app.post('/tasks', (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }

  const newTask = { id: idCounter++, task };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// 3. Delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskId = parseInt(id);

  // Find the task by ID
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  // Remove the task from the array
  tasks.splice(taskIndex, 1);
  res.status(204).send(); // No content to send back
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});