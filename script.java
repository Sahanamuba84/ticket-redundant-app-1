document.getElementById('taskForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const task = document.getElementById('taskInput').value;

  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ task }),
  })
    .then((response) => response.json())
    .then((data) => {
      addTaskToDOM(data);
      document.getElementById('taskInput').value = '';
    })
    .catch((error) => console.error('Error:', error));
});

function addTaskToDOM(task) {
  const li = document.createElement('li');
  li.innerHTML = `
    ${task.task}
    <button onclick="deleteTask('${task.id}')">Delete</button>
  `;
  document.getElementById('taskList').appendChild(li);
}

function deleteTask(id) {
  fetch(`/tasks/${id}`, {
    method: 'DELETE',
  })
    .then(() => {
      document.getElementById('taskList').innerHTML = '';
      fetchTasks();
    })
    .catch((error) => console.error('Error:', error));
}

function fetchTasks() {
  fetch('/tasks')
    .then((response) => response.json())
    .then((data) => {
      data.forEach(addTaskToDOM);
    })
    .catch((error) => console.error('Error:', error));
}


fetchTasks();