document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage when page loads
    loadTasks();

    // Event listeners
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText, true); // Save to localStorage
            taskInput.value = '';
        } else {
            alert('Please enter a task!');
        }
    });

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                addTask(taskText, true);
                taskInput.value = '';
            } else {
                alert('Please enter a task!');
            }
        }
    });

    // Function to add a task
    function addTask(taskText, save = true) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove from DOM and Local Storage
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            removeTaskFromLocalStorage(taskText);
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) {
            saveTaskToLocalStorage(taskText);
        }
    }

    // Save a task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Remove a task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Load tasks from Local Storage on startup
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(task => addTask(task, false)); // Don't save again
    }
});
