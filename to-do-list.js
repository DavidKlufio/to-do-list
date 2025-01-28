let toDolist = JSON.parse(localStorage.getItem('toDolist')) || [];
runToDoList();

function runToDoList() {
   let toDolistHTML = '';

   toDolist.forEach((todo, index) => { // '.forEach();' is a function which acts as a simpler way of traversing an array, instead of using a 'for loop'.
      const {name, date} = todo; // saves the 'name' and 'date' properties of "toDolist" object into variables with the same names.
      const html = `
         <div>${name}</div> 
         <div>${date} </div>
         <div> 
            <input type="checkbox" class="checkbox">
            <button class="deleteButton js-delete-button">
               Delete
            </button>
         </div>
      `;
      toDolistHTML += html;
   });

   document.querySelector('.js-to-do-list')
      .innerHTML = toDolistHTML;

   document.querySelectorAll('.js-delete-button') // 'querySelectorAll();' selects all instances of an element on the page.
      .forEach((deleteButton, index) => {
         deleteButton.addEventListener('click', () => {
            toDolist.splice(index, 1);
            saveTostorage();
            runToDoList();
         });
      })
}

document.querySelector('.js-add-button')
   .addEventListener('click', () => {
      addToDo();
   });



function addToDo() {
   const nameinputElement = document.querySelector('.js-list-input');
   const name = nameinputElement.value;

   const dateInputElement = document.querySelector('.js-date-input');
   const date = dateInputElement.value;

   toDolist.push({
      name,
      date
   });

   nameinputElement.value = '';
   dateInputElement.value = '';

   runToDoList();

   saveTostorage();
}

function saveTostorage() {
   localStorage.setItem('toDolist', JSON.stringify(toDolist));
}