document.getElementById('app').innerHTML = `<form id="todoForm">
<input id="todo" type="text" class="search_bar" placeholder="What needs to be done?">
<ul id="todoList"></ul>
</form>`;

const todoList = [];

document.getElementById('todoForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const todo = document.getElementById('todo');
  todoList.push(todo.value);
  console.log(todoList);
  document.getElementById('todoList').innerHTML = todoList
    .map((todoText) => `<li><input type="checkbox" />${todoText}</li>`)
    .join('');

  todo.value = '';
});
