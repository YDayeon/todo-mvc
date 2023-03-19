const CLASS_COMPLETED = 'completed';
const CLASS_HIDDEN = 'hidden';
const TYPE_PLUS = 'plus';
const TYPE_MINUS = 'minus';

const initHTML = `
<form id="todoForm">
  <div class="search_bar">
    <button type="button" id="allCheckBtn" class="arrow_bottom_btn hidden"></button>
    <input id="todo" type="text" placeholder="What needs to be done?" />
  </div>
  <ul id="todoList"></ul>
  <footer></footer>
</form>  
`;
const footerHTML = `
    <div><span id="activeListCount">0</span> items left</div>
    <div>
      <button type="button" id="allBtn">All</button>
      <button type="button" id="activeBtn">Active</button>
      <button type="button" id="completedBtn">Completed</button>
    </div>
    <button type="button" id="clearCompletedBtn">Clear completed</button>
`;

document.getElementById('app').innerHTML = initHTML;

let todoList = []; // {id:0, text:""}
let activeList;

document.getElementById('todoForm').addEventListener('submit', function (e) {
  e.preventDefault();
  createToDo();
});
allCheckToDo();

function createToDo() {
  const todo = document.getElementById('todo');
  if (todo.value === '') return false;

  const idValue =
    todoList.length > 0 ? todoList[todoList.length - 1].id + 1 : 1;
  todoList.push({ id: idValue, text: todo.value });

  document.getElementById('todoList').innerHTML = todoList
    .map(
      ({ id, text }) =>
        `<li id="${id}"><div><input type="checkbox" />${text}</div><div class="x_button">✕</div></li>`
    )
    .join('');
  todo.value = '';

  handleRemoveTodo();

  const checkBoxList = document.querySelectorAll("input[type='checkbox']");

  const formFooter = document.querySelector('#todoForm footer');
  if (formFooter.innerHTML === '') {
    formFooter.innerHTML = footerHTML;
    document.getElementById('allCheckBtn').classList.remove('hidden');
  } else {
    handleClickFooterButton(checkBoxList);
  }

  setActiveToDoCount(TYPE_PLUS);
  toggleCheckCheckBox(checkBoxList);
}

function allCheckToDo() {
  const allCheckbutton = document.getElementById('allCheckBtn');
  allCheckbutton.addEventListener('click', function () {
    const checkBoxList = document.querySelectorAll("input[type='checkbox']");
    if (allCheckbutton.classList.contains('active')) {
      allCheckbutton.classList.remove('active');
      checkBoxList.forEach((el) => (el.checked = false));
    } else {
      allCheckbutton.classList.add('active');
      checkBoxList.forEach((el) => (el.checked = true));
    }
  });
}

function handleRemoveTodo() {
  const xButton = document.querySelectorAll('.x_button');
  xButton.forEach((el) => {
    el.addEventListener('click', function () {
      const listElement = el.parentElement;
      todoList = todoList.filter(
        (todo) => todo.id.toString() !== listElement.id
      );
      if (!listElement.children[0].classList.contains(CLASS_COMPLETED)) {
        setActiveToDoCount(TYPE_MINUS);
      }
      listElement.remove();

      if (todoList.length === 0) {
        const formFooter = document.querySelector('#todoForm footer');
        formFooter.innerHTML = '';
        const allCheckButton = document.getElementById('allCheckBtn');
        allCheckButton.classList.add('hidden');
      }
    });
  });
}

function toggleCheckCheckBox(checkBoxList) {
  checkBoxList.forEach((el) => {
    const text = el.parentElement;
    el.addEventListener('change', function () {
      if (el.checked) {
        text.classList.add(CLASS_COMPLETED);
        setActiveToDoCount(TYPE_MINUS);
      } else {
        text.classList.remove(CLASS_COMPLETED);
        setActiveToDoCount(TYPE_PLUS);
      }
    });
  });
}

function handleClickFooterButton(checkBoxList) {
  document.getElementById('allBtn').addEventListener('click', function () {
    const allToDoList = document.querySelectorAll('li');
    allToDoList.forEach((el) => el.classList.remove(CLASS_HIDDEN));
  });
  document.getElementById('activeBtn').addEventListener('click', function () {
    checkBoxList.forEach((el) => {
      const listElement = el.parentElement.parentElement;
      if (el.checked) {
        listElement.classList.add(CLASS_HIDDEN);
      } else {
        listElement.classList.remove(CLASS_HIDDEN);
      }
    });
  });
  document
    .getElementById('completedBtn')
    .addEventListener('click', function () {
      checkBoxList.forEach((el) => {
        const listElement = el.parentElement.parentElement;
        if (!el.checked) {
          listElement.classList.add(CLASS_HIDDEN);
        } else {
          listElement.classList.remove(CLASS_HIDDEN);
        }
      });
    });
  document
    .getElementById('clearCompletedBtn')
    .addEventListener('click', function () {
      checkBoxList.forEach((el) => {
        const listElement = el.parentElement.parentElement;
        if (el.checked) {
          listElement.remove();
          todoList = todoList.filter(
            (todo) => todo.id.toString() !== listElement.id
          );
        }
      });

      if (todoList.length === 0) {
        const formFooter = document.querySelector('#todoForm footer');
        formFooter.innerHTML = '';
        const allCheckButton = document.getElementById('allCheckBtn');
        allCheckButton.classList.add('hidden');
      }
    });
}
function setActiveToDoCount(type) {
  if (type === TYPE_PLUS) {
    const activeListCount = document.getElementById('activeListCount');
    activeListCount.innerHTML = parseInt(activeListCount.innerHTML) + 1;
  } else {
    const activeListCount = document.getElementById('activeListCount');
    activeListCount.innerHTML = parseInt(activeListCount.innerHTML) - 1;
  }
}
