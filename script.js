// ! DOM ELEMENTS

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addButton = document.getElementById('addButton');


// ! ADD TASK

function addTask() {
    if (taskInput.value === '') {
        alert('Oh no... You have not written anything?');
    } else {
        // Create a wrapper div for the task
        let taskWrapper = document.createElement('div');
        taskWrapper.classList.add('task-wrapper');


        // Create paragraph element for task text
        let paragraph = document.createElement('p');
        paragraph.textContent = taskInput.value;
        taskWrapper.appendChild(paragraph);

        // Create delete button
        let deleteButton = document.createElement('button');
        deleteButton.id = 'deleteButton';
        deleteButton.textContent = 'DELETE';
        taskWrapper.appendChild(deleteButton);

        taskList.appendChild(taskWrapper);

        deleteButton.addEventListener('click', function () {
            let deleteParagraph = confirm("Are you sure you want to delete this?");
            if (deleteParagraph == true) {
                taskList.removeChild(taskWrapper);
                saveTasks();
            } else {
                saveTasks();
            }
        });

        alert('Task added successfully!');
        saveTasks();
    }

    taskInput.value = '';
}


addButton.addEventListener('click', addTask);

// ! EDIT PARAGRAPH

function editTask(paragraph) {
    const newText = prompt('Edit the task:', paragraph.textContent);
    if (newText !== null && newText !== '') {
        paragraph.textContent = newText;
        saveTasks();
    }
}

taskList.addEventListener('click', function (e) {
    if (e.target.tagName === 'P') {
        editTask(e.target);
    }
});


// ! SAVE TASK TO LOCAL STORAGE

function saveTasks() {
    let tasks = [];
    taskList.querySelectorAll('p').forEach(function (text) {
        tasks.push(text.textContent);

    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

// ! LOAD DATA FROM LOCAL STORAGE

function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    storedTasks.forEach(function (taskText) {
        // Create a wrapper div for the task
        let taskWrapper = document.createElement('div');

        // Create paragraph element for task text
        let paragraph = document.createElement('p');
        paragraph.textContent = taskText;
        taskWrapper.appendChild(paragraph);

        // Create delete button
        let deleteButton = document.createElement('button');
        deleteButton.id = 'deleteButton';
        deleteButton.textContent = 'DELETE';
        taskWrapper.appendChild(deleteButton);

        taskList.appendChild(taskWrapper);

        deleteButton.addEventListener('click', function () {
            let deleteParagraph = confirm("Are you sure you want to delete this?");
            if (deleteParagraph == true) {
                taskList.removeChild(taskWrapper);
                saveTasks();
            } else {
                saveTasks();
            }
        });
    });
}

loadTasks();