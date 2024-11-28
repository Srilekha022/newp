document.getElementById('task-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const task = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        due_date: document.getElementById('due_date').value,
        status: 'Pending'
    };

    await fetch('http://127.0.0.1:5000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });

    loadTasks();
    e.target.reset();
});

async function loadTasks() {
    const response = await fetch('http://127.0.0.1:5000/tasks');
    const tasks = await response.json();
    const tasksContainer = document.getElementById('tasks-container');
    tasksContainer.innerHTML = '';
    tasks.forEach(task => {
        tasksContainer.innerHTML += `
            <div class="task-item">
                <p>${task.title} - ${task.status}</p>
                <button onclick="deleteTask(${task.id})">Delete</button>
                <button onclick="editTask(${task.id})">Edit</button>
            </div>
        `;
    });
}

async function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        await fetch(`http://127.0.0.1:5000/tasks/${id}`, { method: 'DELETE' });
        loadTasks();
    }
}

async function editTask(id) {
    const title = prompt("Enter new title:");
    const description = prompt("Enter new description:");
    const due_date = prompt("Enter new due date (YYYY-MM-DD):");
    const status = prompt("Enter status (Pending/Completed):");

    await fetch(`http://127.0.0.1:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, due_date, status }),
    });

    loadTasks();
}

loadTasks();
