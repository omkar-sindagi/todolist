document.addEventListener("DOMContentLoaded",()=>{
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))

    if(storedTasks){
        storedTasks.forEach((task)=>tasks.push(task))
        updateStats();
        saveTasks();
    }
})

let tasks = [];


const saveTasks = ()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
         console.log(tasks);

        updateTaskList();
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed =!tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasks();
    console.log("Toggled:", tasks[index]);
    // console.log(tasks)
}

const deleteTask =(index) => {
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTasks();
}

const editTask =(index) => {
    const taskInput =document.getElementById('taskInput')
    taskInput.value =tasks[index].text

    tasks.splice(index, 1);
    updateTaskList();
    saveTasks();
}

const updateStats = () => {
    const completedTasks= tasks.filter ((task) => task.completed).length;
    const totalTask =tasks.length;
    const progress =(completedTasks/totalTask)*100;
    const progressBar =document.getElementById('progress')

    progressBar.style.width = `${progress}%`;

    document.getElementById('numbers').innerText = `${completedTasks}/${totalTask}`;

    if (tasks.length && completedTasks === totalTask) {
        blastconfetti();
    }
}

//CREATES NEW TASK LINE WITH CHECKBOX and icons 

const updateTaskList = () =>{
    const taskList = document.getElementById("task-list");
    taskList.innerHTML= "";


    tasks.forEach((task, index) => {
        const listItem = document.createElement("li")

        listItem.innerHTML= `
        <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
                <p> ${task.text}</p>
        </div>
        <div class="icons">
                <span class="material-symbols-outlined" onClick="editTask(${index})">edit_square</span>
                <span class="material-symbols-outlined" onClick="deleteTask(${index})">delete</span>
        </div>
    </div>
    `;
    listItem.addEventListener("change", ()=> toggleTaskComplete(index));
    taskList.appendChild(listItem);
      })
}

document.getElementById('newTask').addEventListener('click', function(e) {
    e.preventDefault();
    addTask();
});

//Animation 

const blastconfetti = ()=>{
   confetti({
  particleCount: 500,
  spread: 90,
  origin: { y: 0.6 },
});
}

