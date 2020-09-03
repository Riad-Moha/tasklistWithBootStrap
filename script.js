// Selecting elements
const form = document.querySelector("form");
const newTask = document.querySelector(".new-task");
const ul = document.querySelector('ul');
const body = document.querySelector('body');
const clearTasks = document.querySelector('.clear-tasks');
const filterTask = document.querySelector('#filter');

// adding an event listener to the form

form.addEventListener('submit', addingFun);

//adding an event listener to the body
body.addEventListener('click', deleteFun);

//adding an evnet listener to clear tasks
clearTasks.addEventListener('click', clearFun);

//Adding an event listerer to filter tasks
filterTask.addEventListener('keyup', filterFun);

//Adding an event listener when the page is loaded
window.addEventListener('DOMContentLoaded', displayFunc);


//  A function to Add list items to the ul(unorderd list)

function addingFun(e) {
  e.preventDefault();
  // Verify if the task input is empty
  if (newTask.value == "") {
    alert("Please enter a task");
  }
  else {
    // create li element
    const li = document.createElement('li');
    //attach a class to the li element
    li.className = "list-group-item";
    // Append a text node to the li element
    li.appendChild(document.createTextNode(newTask.value));
    // Create a link (a)
    const link = document.createElement('a');
    //Adding a class to the link
    link.className = "float-right";
    // Append the icon the the link
    link.innerHTML = '<i class="fas fa-window-close"></i>';
    li.appendChild(link);
    ul.appendChild(li);
    // A function to persist list Item to localStorage
    saveTolocalStorage(newTask);
    newTask.value ="";
    
    
  }
}
// deleting individual tasks function
function deleteFun(e) {
 const Iclass = e.target.classList.contains('fa-window-close');
 if(Iclass) { 
   if(confirm("Are you sure?")) {
     e.target.parentElement.parentElement.remove();
     e.target.parentElement.parentElement.textContent;
     removeFromLocalStorage(e.target.parentElement.parentElement.textContent);
   }
 }

}

// Filter function
function filterFun(e) {
  const text = e.target.value.toLowerCase();
 document.querySelectorAll('.list-group-item').forEach(function(task) {
    if(task.firstChild.textContent.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    }
    else {
      task.style.display = "none";
    }
  })
}

// Save to localStorage
function saveTolocalStorage(task) { 
  let tasks;
  tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks == null) {
    tasks = []
  }
    tasks.push(task.value);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Getting data from localstorage and display them
function displayFunc() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach(function(task) {
     // create li element
     const li = document.createElement('li');
     //attach a class to the li element
     li.className = "list-group-item";
     // Append a text node to the li element
     li.appendChild(document.createTextNode(task));
     // Create a link (a)
     const link = document.createElement('a');
     //Adding a class to the link
     link.className = "float-right";
     // Append the icon the the link
     link.innerHTML = '<i class="fas fa-window-close"></i>';
     li.appendChild(link);
     ul.appendChild(li);
     // A function to persist list Item to localStorage
  }); 
  
}

// A function to remove a single task from the localStorage
function removeFromLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks == null) {
    tasks = [];
  }
  else  {
    tasks.forEach(function(item, index) {
      if (item === task) {
      tasks.splice(index, 1);
      }
    })
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear tasks function
function clearFun() {
  ul.innerHTML = "";
  localStorage.removeItem("tasks");
}