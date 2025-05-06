import './styles/style.css';

import { nanoid } from 'nanoid';

const allToDos = [
  {
    id: nanoid(5),
    task: 'Comprar leche 🥛',
    isCompleted: false
  },
  {
    id: nanoid(5),
    task: 'Escribir código 💻',
    isCompleted: true
  },
  {
    id: nanoid(5),
    task: 'Hacer la compra 🛒',
    isCompleted: false
  }
];

// Cazo la sección donde añadiré las tareas
const toDoList = document.querySelector('.toDo-list');


// Imprimir los todos al cargar la página
printToDos();

// Rellenar el número de items que faltan por completar
countItemsLeft();



function printToDos () {
  // Borrar toda la lista de tareas
  toDoList.innerHTML = '';

  // Recorro cada tarea de la lista de tareas
  for (const toDo of allToDos) {   

    const article = createToDoHTML(toDo);  
    // Lo meto en el DOM dentro de la sección
    toDoList.append(article);  
  }
}

function createToDoHTML (toDo) {

    // Creo un nuevo "article" por cada uno
    const article = document.createElement('article');
  
    // Le pongo las clases que necesita el article
    article.className = 'bg-white py-2 px-4 first:rounded-t flex items-center gap-3  border-b border-b-gray-300';
  
    // Crear una variable para saber si el input estará checked o no
    const isChecked = toDo.isCompleted ? 'checked' : '';
  
    // Crear una variable para saber si el check icon estará visible o no
    const isCheckIconVisible = toDo.isCompleted ? '' : 'hidden';
  
    // Le pongo lo de dentro
    article.innerHTML = `
    <input aria-label="Complete to-do checkbox" id="${toDo.id}" class="complete-checkbox hidden peer" type="checkbox" ${isChecked}>
    <label for="${toDo.id}" class="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center peer-checked:bg-check-gradient">
      <svg class="${isCheckIconVisible} check-icon" xmlns="http://www.w3.org/2000/svg" width="10" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
    </label>
    <span class="peer-checked:line-through peer-checked:opacity-30">${toDo.task}</span>
    <button aria-label="Delete button" type="button" class="ml-auto text-gray-600 cursor-pointer hover:scale-110 hover:rotate-90 transition-transform">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <path fill="currentColor" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/>
      </svg>
    </button>
    `;

    
    //* Justo aquí debajo, el article YA TIENE DENTRO el input y el Button que completan y borran el toDo.
    const completedInput = article.querySelector('.complete-checkbox');
    completedInput.addEventListener('change', () => {
      // Aquí YO TENGO EL OBJETO DEL TODO ENTERO, así que puedo cambiar su propiedad isCompleted a true o false
      toDo.isCompleted = !toDo.isCompleted;

      printToDos();
      countItemsLeft();
    });
    

    //* Ahora caza el boton de borrar

    //* Le escuchas el click

    //* Buscas dentro del array cual es el que quiero borrar (con el id)

    //* Haces un splice para borrarlo del array

    //* Reimprimes la lista de todos

    //* Recalculas el número de items que faltan por completar


    return article;
}

function countItemsLeft () {
  const itemsLeftOutput = document.querySelector('.items-left-output');
  
  let itemsLeftCount = 0;
  for (const toDo of allToDos) {
    if (toDo.isCompleted === false) {
      itemsLeftCount++;
    }
  }
  
  itemsLeftOutput.innerText = itemsLeftCount;
}


// Cazamos el formulario
const $addToDoForm = document.querySelector('.add-todo-form');

// Escuchamos el evento submit
$addToDoForm.addEventListener('submit', handleAddToDoFormSubmit);



function handleAddToDoFormSubmit (event) {
  
  // Paramos el comportamiento por defecto del formulario
  event.preventDefault();
  
  // Cogemos el valor del usuario
  const newTaskValue = $addToDoForm.addToDoInput.value;
  

  //! Oye, mejor frena si te lo dejan vacío 
  if(isInputEmpty(newTaskValue)) {
    return;
  }
   
  // Creamos un nuevo TODO que meteremos en el array
  createNewToDo(newTaskValue);
  
  // Reimprimimos todos los todos
  printToDos();

  // Recalculamos el número de items que faltan por completar
  countItemsLeft();

  // vaciar el input
  // opcion modificar el value a un string vacío
  // $addToDoForm.addToDoInput.value = '';

  // opción resetear el formulario
  $addToDoForm.reset();
}


function createNewToDo (newTaskValue) {
  const newToDo = {
    id: nanoid(5),
    task:  newTaskValue,
    isCompleted: false
  };

  allToDos.push(newToDo);
}

function isInputEmpty (value) {
  if (value === '') {
    $addToDoForm.addToDoInput.classList.replace('focus-visible:ring-2', 'ring-4')
    $addToDoForm.addToDoInput.classList.replace('focus-visible:ring-pink-500', 'ring-red-500')
    return true;
  } else {
    $addToDoForm.addToDoInput.classList.replace('ring-4', 'focus-visible:ring-2')
    $addToDoForm.addToDoInput.classList.replace('ring-red-500', 'focus-visible:ring-pink-500')
    return false;
  }
}


// const handleAddToDoFormSubmit = (event) => {

//   // Paramos el comportamiento por defecto del formulario
//   event.preventDefault();
  
//   // Cogemos el valor del usuario
//   const newTaskValue = $addToDoForm.addToDoInput.value;
  

//   //! Oye, mejor frena si te lo dejan vacío
//   if (newTaskValue === '') {
//     $addToDoForm.addToDoInput.classList.replace('focus-visible:ring-2', 'ring-4')
//     $addToDoForm.addToDoInput.classList.replace('focus-visible:ring-pink-500', 'ring-red-500')
//     return;
//   } else {
//     $addToDoForm.addToDoInput.classList.replace('ring-4', 'focus-visible:ring-2')
//     $addToDoForm.addToDoInput.classList.replace('ring-red-500', 'focus-visible:ring-pink-500')
//   }

   
//   // Creamos un nuevo TODO que meteremos en el array
//   const newToDo = {
//     id: nanoid(5),
//     task:  newTaskValue,
//     isCompleted: false
//   };

//   allToDos.push(newToDo);
  
//   // Reimprimimos todos los todos
//   printToDos();

//   // Recalculamos el número de items que faltan por completar
//   countItemsLeft();

//   // vaciar el input
//   // opcion modificar el value a un string vacío
//   // $addToDoForm.addToDoInput.value = '';

//   // opción resetear el formulario
//   $addToDoForm.reset();
// }







