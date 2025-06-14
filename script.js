// Wait until the HTML page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('todo-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Remove spaces

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create the task item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove the task when button is clicked
        removeBtn.addEventListener('click', () => {
            taskList.removeChild(li);
        });

        // Add remove button to task and add task to list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';
    }

    // Add task on button click
    addButton.addEventListener('click', addTask);

    // Add task on "Enter" key press
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
