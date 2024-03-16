// ! DOM ELEMENTS

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addButton = document.getElementById('addButton');


// ! ADD TASK

addButton.addEventListener('click', addTask);

function addTask() {
    if (taskInput.value === '') {
        alert('Oh no... You have not written anything?');
    } else {
        let paragraph = document.createElement('p');
        paragraph.textContent = taskInput.value;
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        paragraph.prepend(checkbox);
        taskList.appendChild(paragraph);
        saveTasks();
    }

    taskInput.value = '';
}



// ! SAVE TASK TO LOCAL STORAGE

function saveTasks() {
    // ! Initialize an empty array to store data
    let tasks = [];
    let checkboxes = [];
    //! Iterate through each list item and store its text content
    taskList.querySelectorAll('p').forEach(function (text) {
        tasks.push(text.textContent);

    });

    taskList.querySelectorAll('input[type="checkbox"]').forEach(function (input) {
        checkboxes.push({ checked: input.checked });
    })

    // ! Save tasks array to local storage after converting it to a string
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('checkboxes', JSON.stringify(checkboxes));

}


// ! LOAD DATA FROM LOCAL STORAGE
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.innerHTML = storedTasks.map(task => `<p>${task}</p>`).join('');
}

loadTasks();


// ! EDIT P TAG

function editTask(paragraph) {
    const newText = prompt('Edit the task:', paragraph.textContent);
    if (newText !== null && newText !== '') {
        paragraph.textContent = newText;
        saveTasks(); // Save the updated tasks to local storage
    }
}

// Add event listener to each task paragraph for editing
taskList.addEventListener('dblclick', function (e) {
    if (e.target.tagName === 'P') {
        editTask(e.target);
    }
});

// ! REMOVE CHILD


function deleteTask(paragraph) {
    const parent = document.getElementById("taskList");
    parent.removeChild(paragraph);
    saveTasks();
}

taskList.addEventListener("click", function (e) {
    if (e.target.tagName === 'P') {
        deleteTask(e.target);
    }
});