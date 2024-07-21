document.addEventListener("DOMContentLoaded", function() {
    const year = document.getElementById("currentyear");
    const today = new Date();
    year.innerHTML = `${today.getFullYear()}`;

    const lastModifiedElement = document.getElementById("lastModified");
    lastModifiedElement.textContent = `${document.lastModified}`;

    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
        registerForm.addEventListener("submit", registerUser);
    }

    if (loginForm) {
        loginForm.addEventListener("submit", loginUser);
    }

    loadTasks();
    loadPendingTasks();
    loadDeletedTasks();
    
});



function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    localStorage.setItem('user', JSON.stringify({ username, email, password }));
    alert('User successfully registered');
    window.location.href = 'login.html';
}

function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        localStorage.setItem('loggedInUser',JSON.stringify(storedUser));
        alert('Logged in successfully');
        window.location.href = 'profile.html';
    } else {
        alert('Wrong email or password');
    }
}

function addTask() {
    const taskInput = document.getElementById('newTask');
    const taskList = document.getElementById('taskList');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const li = document.createElement('li');
        li.innerHTML = `${taskText} <button onclick="removeTask(event)">Delete</button><button onclick="markAsPending(event)">Move to Pending</button>`;
        taskList.appendChild(li);
        taskInput.value = '';        
        saveTask(taskText);
    }
}

function saveTask(taskText) {
    let tasks = localStorage.getItem('tasks');
    tasks = tasks ? JSON.parse(tasks) : [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    if (!taskList) {
        console.error('TaskList element not found');
        return;
    }
    let tasks = localStorage.getItem('tasks');
    tasks = tasks ? JSON.parse(tasks) : [];
    updateTaskList(taskList, tasks, false);
}

function markAsPending(event) {
    const taskList = document.getElementById('taskList');
    const pendingTaskList = document.getElementById('pendingTaskList');

    let tasks = localStorage.getItem('tasks');
    let pendingTasks = localStorage.getItem('pendingTasks');

    tasks = tasks ? JSON.parse(tasks) : [];
    pendingTasks = pendingTasks ? JSON.parse(pendingTasks) : [];

    const taskText = event.target.parentElement.firstChild.textContent.trim();

    tasks = tasks.filter(task => task !== taskText);
    pendingTasks.push(taskText);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks));

    updateTaskList(taskList, tasks, true);
    updateTaskList(pendingTaskList, pendingTasks, false);
}

function removeTask(event) {
    const taskList = document.getElementById('taskList');
    const pendingTaskList = document.getElementById('pendingTaskList');
    const deletedTaskList = document.getElementById('deletedTaskList');

    let tasks = localStorage.getItem('tasks');
    let pendingTasks = localStorage.getItem('pendingTasks');
    let deletedTasks = localStorage.getItem('deletedTasks');

    tasks = tasks ? JSON.parse(tasks) : [];
    pendingTasks = pendingTasks ? JSON.parse(pendingTasks) : [];
    deletedTasks = deletedTasks ? JSON.parse(deletedTasks) : [];

    const taskText = event.target.parentElement.firstChild.textContent.trim();

    tasks = tasks.filter(task => task !== taskText);
    pendingTasks = pendingTasks.filter(task => task !== taskText);

    deletedTasks.push(taskText);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks));
    localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));

    updateTaskList(taskList, tasks, true);
    updateTaskList(pendingTaskList, pendingTasks, false);
    updateTaskList(deletedTaskList, deletedTasks, false);
}

function deleteTaskPermanently(event) {
    const deletedTaskList = document.getElementById('deletedTaskList');

    let deletedTasks = localStorage.getItem('deletedTasks');
    deletedTasks = deletedTasks ? JSON.parse(deletedTasks) : [];

    const taskText = event.target.parentElement.firstChild.textContent.trim();

    deletedTasks = deletedTasks.filter(task => task !== taskText);

    localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));

    updateTaskList(deletedTaskList, deletedTasks, false);
}

function updateTaskList(listElement, tasks, showMoveButton) {
    if (!listElement) {
        console.error('listElement is null or undefined');
        return;
    }

    listElement.innerHTML = '';
    tasks.forEach(taskText => {
        const li = document.createElement('li');
        if (listElement.id === 'deletedTaskList') {
            li.innerHTML = `${taskText} <button onclick="deleteTaskPermanently(event)">Delete Permanently</button>`;
        } else {
            if (showMoveButton) {
                li.innerHTML = `${taskText} <button onclick="removeTask(event)">Delete</button> <button onclick="markAsPending(event)">Move to Pending</button>`;
            } else {
                li.innerHTML = `${taskText} <button onclick="removeTask(event)">Delete</button>`;
            }
        }
        listElement.appendChild(li);
    });
}

function loadPendingTasks() {
    const pendingTaskList = document.getElementById('pendingTaskList');
    if (!pendingTaskList) {
        console.error('Pending Task List element not found');
        return;
    }
    let pendingTasks = localStorage.getItem('pendingTasks');
    pendingTasks = pendingTasks ? JSON.parse(pendingTasks) : [];
    updateTaskList(pendingTaskList, pendingTasks, false);
}

function loadDeletedTasks() {
    const deletedTaskList = document.getElementById('deletedTaskList');
    if (!deletedTaskList) {
        console.error('Deleted Task List element not found');
        return;
    }
    let deletedTasks = localStorage.getItem('deletedTasks');
    deletedTasks = deletedTasks ? JSON.parse(deletedTasks) : [];
    updateTaskList(deletedTaskList, deletedTasks, false);
}

