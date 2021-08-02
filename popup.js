const tasks = [{task:"work out",status:1},{task:"study",status:1},{task:"sleep",status:0},{task:"meditate",status:0},]
const tasksStr = JSON.stringify(tasks);

function fetchTasks() {
    let tasksStrLocal = localStorage.getItem("tasks");
    if(!tasksStrLocal){
        localStorage.setItem("tasks",tasksStr);
        tasksStrLocal = tasksStr;
    }
    const parsedTasks = JSON.parse(tasksStrLocal)
    return parsedTasks
}

function deleteTask(task) {
    let fetchedTasks = fetchTasks();
    fetchedTasks = fetchedTasks.slice(0).reverse().filter((el,i)=>i!=task).slice(0).reverse()
    localStorage.setItem("tasks",JSON.stringify(fetchedTasks));
    updateTasks(fetchedTasks);
    document.querySelectorAll('.deleteTaskEmoji').forEach(function(el,i) {
        el.addEventListener("click", ()=>deleteTask(i))
    });    
    document.querySelectorAll('.taskStatusEmoji').forEach(function(el,i) {
        el.addEventListener("click", ()=>modifyTaskStatus(i));
    });
}

function modifyTaskStatus(i) {
    console.log('modify task status',i);
    let fetchedTasks = fetchTasks().slice(0).reverse();
    if(fetchedTasks[i].status==1){
        fetchedTasks[i].status=0
    }else{
        fetchedTasks[i].status=1
    }
    localStorage.setItem("tasks",JSON.stringify(fetchedTasks.slice(0).reverse()));
    updateTasks(fetchedTasks.slice(0).reverse());
    document.querySelectorAll('.deleteTaskEmoji').forEach(function(el,i) {
        el.addEventListener("click", ()=>deleteTask(i))
    });    
    document.querySelectorAll('.taskStatusEmoji').forEach(function(el,i) {
        el.addEventListener("click", ()=>modifyTaskStatus(i));
    });
}

function inputTaskAdding(e) {
    const inputValue = document.querySelector('input').value
    if(inputValue){
        if(e.key=== 'Enter'){
            addTask();
            return
        }
        document.querySelector('.addTaskButton').removeAttribute('disabled')
    }else{
        document.querySelector('.addTaskButton').setAttribute('disabled', 'true')
    }
}

function addTask() {
    const newTask = document.querySelector('input').value;
    document.querySelector('input').value = '';
    const fetchedTasks = fetchTasks();
    fetchedTasks.push({task:newTask,status:1});
    localStorage.setItem("tasks",JSON.stringify(fetchedTasks));
    updateTasks(fetchedTasks);
    document.querySelectorAll('.deleteTaskEmoji').forEach(function(el,i) {
        el.addEventListener("click", ()=>deleteTask(i))
    });    
    document.querySelectorAll('.taskStatusEmoji').forEach(function(el,i) {
        el.addEventListener("click", ()=>modifyTaskStatus(i));
    });
    inputTaskAdding()
}

function updateTasks(obj) {
    let taskListEl = '';
    console.log(obj)
    for (const task of obj) {
        let classStr = 'task-description';
        let squareEmoji = ''
        if(task.status==0){
            classStr += ' striked'
            squareEmoji = '☑️'
        }else{
            squareEmoji = '⬜'
        }
        taskListEl = `
            <li>
                <span class="${classStr}">${task.task}</span>
                <span class="task-actions">
                    <span class="taskStatusEmoji">${squareEmoji}</span>
                    <span class="deleteTaskEmoji">❌</span>
                </span>
            </li>
        `+ taskListEl
    }
    document.querySelector('ul').innerHTML = taskListEl;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.deleteTaskEmoji').forEach(function(el,i) {
        el.addEventListener("click", ()=>deleteTask(i))
    });

    document.querySelectorAll('.taskStatusEmoji').forEach(function(el,i) {
        el.addEventListener("click", ()=>modifyTaskStatus(i));
    });
    document.querySelector('input').addEventListener('keyup',(e)=>inputTaskAdding(e));
    document.querySelector('.addTaskButton').addEventListener('click',addTask);
});

const fetchedTasks = fetchTasks();
updateTasks(fetchedTasks)