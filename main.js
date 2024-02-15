document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const taskTitle = document.getElementById('taskTitle').value;
    const taskContent = document.getElementById('taskContent').value;

    fetch('https://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskTitle, taskContent })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        loadTasks(); // Reload the tasks list
        clearForm(); // Clear the form fields
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
function loadTasksDoing(){
    fetch('https://localhost:3000/tasks/doing')
    .then(response => response.json())
    .then(tasks => {
        const tasksContainer = document.getElementById('tasksDoing');
        tasksContainer.innerHTML = ''; // Clear existing tasks

        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.style.border = "1px solid rgba(0,0,0, 0.3)";
            taskElement.classList.add("my-2","p-2")
            taskElement.innerHTML = `<h3>${task.taskTitle}</h3><p>${task.taskContent}</p><div class="form-check mt-3">
            <input class="form-check-input taskToDo" type="radio" name="taskToDo" value="2" onclick="changeTaskStatus(this,${task.idtask})">
            <label class="form-check-label" for="taskToDo">
             retour A faire ⬅️
            </label>
          </div>
          <div class="form-check mb-3">
            <input class="form-check-input taskArchive" type="radio" name="taskArchive" value="1" onclick="archiveTask(this,${task.idtask})">
            <label class="form-check-label" for="taskArchive">
              Terminer 🔥
            </label>
          </div>
                                     <button class="btn btn-danger" onclick="deleteTask(${task.idtask})">Delete 💀</button>`;
            tasksContainer.appendChild(taskElement);
        });
    })
}
function loadTasksArhived(){
    fetch('https://localhost:3000/archived')
    .then(response => response.json())
    .then(tasks => {
        const tasksContainer = document.getElementById('tasksDone');
        tasksContainer.innerHTML = ''; // Clear existing tasks

        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.style.border = "1px solid rgba(0,0,0, 0.3)";
            taskElement.classList.add("my-2","p-2")
            taskElement.innerHTML = `<h3>${task.taskTitle}</h3><p>${task.taskContent}</p><p>Archivé le : <sub>${task.archivedAt}</sub></p>
                                     <button class="btn btn-danger" onclick="deleteTask(${task.idtask})">Delete 💀</button>`;
            tasksContainer.appendChild(taskElement);
        });
    })
}
function loadTasks() {
    fetch('https://localhost:3000/tasks')
    .then(response => response.json())
    .then(tasks => {
        const tasksContainer = document.getElementById('tasks');
        tasksContainer.innerHTML = ''; // Clear existing tasks

        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.style.border = "1px solid rgba(0,0,0, 0.3)";
            taskElement.classList.add("my-2","p-2")
            taskElement.innerHTML = `<h3>${task.taskTitle}</h3><p>${task.taskContent}</p><div class="form-check my-3">
            <input class="form-check-input taskToDo" type="radio" name="taskToDo" value="1" onclick="changeTaskStatus(this,${task.idtask})">
            <label class="form-check-label" for="taskToDo">
                Faire ➡️
            </label>
          </div>
                                     <button class="btn btn-danger" onclick="deleteTask(${task.idtask})">Delete 💀</button>`;
            tasksContainer.appendChild(taskElement);
        });
    })
    .catch((error) => {
        console.error('Error fetching tasks:', error);
    });
}
function archiveTask(element, taskId) {
    const isFinished = element.value;

    fetch(`https://localhost:3000/tasks/${taskId}/archived`, { // Notez le changement d'URL
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isFinished })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Task archived:', data);
        loadTasks();
        loadTasksDoing();
        loadTasksArhived(); // Recharger toutes les listes de tâches
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
function deleteTask(taskId) {
    fetch(`https://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Task deleted:', data);
        loadTasks(); // Reload the tasks list
        loadTasksDoing();
        loadTasksArhived();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
function changeTaskStatus(element,taskId){
    const status_idstatus = element.value
    fetch(`https://localhost:3000/tasks/${taskId}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({status_idstatus})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Status Updated:', data);
        loadTasks();
        loadTasksDoing();
     // Reload the tasks list
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}
function clearForm() {
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskContent').value = '';
}
// Load tasks when the page loads
loadTasksDoing();
loadTasksArhived();
loadTasks();
