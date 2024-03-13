import { saveTask, getTasks, onGetTasks, deleteTask, getTask, updateTask } from './firebase.js'

const taskForm = document.getElementById('task-form')
const taskContainer = document.getElementById('task-container')

let editStatus = false;
let id = '';
let userGlobal;

window.addEventListener('DOMContentLoaded', async() => {
    onGetTasks((querySnapshot)=> {
        let html = ''

    querySnapshot.forEach(doc => {
        const publications = doc.data()
        html += `
           <div>
                <p class="text-end">${publications.date} ${publications.hours}</p>
                        <div class="d-flex align-items-center">
                            <img src="${publications.userPhotoURL}" class="me-2" style="width: 40px; height: 40px; border-radius: 50%;" />
                            <h6>${publications.userName}</h6>
                        </div>
                 <h3> ${publications.title} </h3>
                 <p> ${publications.description} </p>
                 <button class='btn-delete' data-id="${doc.id}"> DELETE </button>
                 <button class='btn-edit' data-id="${doc.id}"> EDIT </button>
           </div>
        `
    });

     taskContainer.innerHTML = html;

      const btnsdelete = taskContainer.querySelectorAll('.btn-delete')
      
      btnsdelete.forEach(btn => {
        btn.addEventListener('click',({target:{dataset}})=>{
            deleteTask(dataset.id)
        });
      });

      const btnsEdit = taskContainer.querySelectorAll('.btn-edit')
      btnsEdit.forEach(btn => {
        btn.addEventListener('click', async (e) =>{
            const doc = await getTask (e. target.dataset.id)
            const task = doc.data()

            taskForm['task-title'].value = task.title
            taskForm['task-description'].value = task.description

            editStatus = true;
            id = doc.id;

            taskForm['btn-task-save'].innerText = 'Publicar'
        });
      });

    });
    });

taskForm.addEventListener('submit',(e) => {
    e.preventDefault();

    const userName = userGlobal ? userGlobal.displayName : '';

    //foto
    const userPhotoURL = userGlobal ? userGlobal.photoURL : '';

     //FECHA
     const date = getFormattedDate(new Date ());

     //HORA
     const hours = getFormattedHour( new Date());

   const title = taskForm['task-title']
    const description = taskForm['task-description']

    if (!editStatus){
        saveTask(title.value, description.value, userName, date, hours);
    } else {
        updateTask(id, {
        title: title.value,
        description: description.value,
        userName: userName,
        date: date,
        hours: hours
        })

        editStatus = false;
    }

    taskForm.reset()

})

function getFormattedDate(date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return day + '/' + month + '/' + year;
  } 

function getFormattedHour(date) {
    var hours = date.getHours().toString().padStart(2, '0');
    var minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}

// Resto del código de Firebase...
