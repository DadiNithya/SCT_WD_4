let taskList = document.getElementById("taskList");

// Load tasks from local storage
window.onload = function(){
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => renderTask(task));
};

function addTask(){

  let taskInput = document.getElementById("taskInput");
  let taskTime = document.getElementById("taskTime");

  if(taskInput.value === ""){
    alert("Please enter a task");
    return;
  }

  let task = {
    id: Date.now(),
    text: taskInput.value,
    time: taskTime.value,
    completed: false
  };

  saveTask(task);
  renderTask(task);

  taskInput.value = "";
  taskTime.value = "";
}

// Save task
function saveTask(task){
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render task
function renderTask(task){

  let li = document.createElement("li");

  li.innerHTML = `
    <span class="${task.completed ? 'completed' : ''}">
      ${task.text} <br>
      <small>${task.time ? task.time : ''}</small>
    </span>

    <div class="task-actions">

      <button class="small" onclick="toggleComplete(${task.id})">✔</button>

      <button class="small" onclick="editTask(${task.id})">✏</button>

      <button class="small" onclick="deleteTask(${task.id})">🗑</button>

    </div>
  `;

  li.setAttribute("data-id", task.id);
  taskList.appendChild(li);
}

// Toggle complete
function toggleComplete(id){

  let tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks = tasks.map(task => {
    if(task.id === id){
      task.completed = !task.completed;
    }
    return task;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  refreshUI();
}

// Edit task
function editTask(id){

  let tasks = JSON.parse(localStorage.getItem("tasks"));

  let task = tasks.find(t => t.id === id);

  let newText = prompt("Edit task:", task.text);

  if(newText){
    task.text = newText;
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  refreshUI();
}

// Delete task
function deleteTask(id){

  let tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks = tasks.filter(task => task.id !== id);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  refreshUI();
}

// Refresh UI
function refreshUI(){
  taskList.innerHTML = "";
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => renderTask(task));
}