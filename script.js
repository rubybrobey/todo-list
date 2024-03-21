// ! DOM ELEMENTS

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addButton = document.getElementById('addButton');


// ! ADD TASK

function addTask() {
    if (taskInput.value === '') {
        alert('Oh no... You have not written anything?');
    } else {
        let paragraph = document.createElement('p');
        paragraph.textContent = taskInput.value;
        taskList.appendChild(paragraph);

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'ERASE';
        paragraph.appendChild(deleteButton);

        deleteButton.addEventListener('click', function () {
            taskList.removeChild(paragraph);
            saveTasks();
        });

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
    taskList.innerHTML = storedTasks.map(task => `<p>${task}</p>`).join('');

}

loadTasks();