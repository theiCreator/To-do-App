// Constants for DOM elements
const inputField = document.querySelector("input");
const form = document.querySelector(".form");
const todoContainer = document.querySelector(".todos");
const delAllBtn = document.querySelector(".delete-btn");
const todoCount = document.querySelector(".num");
const completedCount = document.querySelector(".numComplete");

// Initial todo list
let todos = [
  {
    todo: "Buy more $WEN and $COM for the bull",
    id: Date.now().toString(),
    completed: false,
  },
];

// Render todos
function renderTodos(todoList) {
  todoContainer.innerHTML = ""; // Clear existing todos
  if (todoList.length === 0) {
    todoContainer.innerHTML = `<p class='no-todo'>Kindly enter your todo Items</p>`;
  } else {
    let markup = "";
    todoList.forEach((todo) => {
      markup += `
        <li class="list_thing" data-id="${todo.id}">
          <button class="btn todo-check-btn" data-id="${todo.id}">
            <ion-icon name="stop-outline" class="${
              todo.completed ? "hidden" : ""
            }"></ion-icon>
            <ion-icon class="doneTodo ${
              todo.completed ? "" : "hidden"
            }" name="checkbox"></ion-icon>
          </button>
          <span class="todoMsg" data-id="${todo.id}">${todo.todo}</span>
          <p class="display-msg">${todo.completed ? "completed!!!" : ""}</p>
          <button class="btn del-btn" data-id="${todo.id}">&times;</button>
        </li>`;
    });
    todoContainer.innerHTML = markup;
  }
  todoCount.textContent = todoList.length;
}

// Add new todo
function addNewTodo(value) {
  const todo = {
    todo: value,
    id: Date.now().toString(),
    completed: false,
  };
  todos.push(todo);
}

// Delete a todo
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos(todos);
  updateCompletedCount();
}

// Toggle completion of a todo
function toggleTodoCompletion(id) {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  todos[todoIndex].completed = !todos[todoIndex].completed;
  renderTodos(todos);
  updateCompletedCount();
}

// Update count of completed todos
function updateCompletedCount() {
  const completedTodos = todos.filter((todo) => todo.completed);
  completedCount.textContent = completedTodos.length;
}

// Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (inputField.value.trim() !== "") {
    addNewTodo(inputField.value.trim());
    renderTodos(todos);
    inputField.value = "";
  }
});

todoContainer.addEventListener("mouseover", function (e) {
  const listItem = e.target.closest(".list_thing");
  if (!listItem) return;
  listItem.querySelector(".del-btn").classList.remove("hidden");
});

todoContainer.addEventListener("mouseout", function (e) {
  const listItem = e.target.closest(".list_thing");
  if (!listItem) return;
  listItem.querySelector(".del-btn").classList.add("hidden");
});

todoContainer.addEventListener("click", function (e) {
  const delBtn = e.target.closest(".list_thing .del-btn");
  if (delBtn) {
    const todoId = delBtn.dataset.id;
    deleteTodo(todoId);
  }

  const checkBtn = e.target.closest(".list_thing .todo-check-btn");
  if (checkBtn) {
    const todoId = checkBtn.dataset.id;
    toggleTodoCompletion(todoId);
  }
});

delAllBtn.addEventListener("click", function (e) {
  e.preventDefault();
  todos = [];
  renderTodos(todos);
  completedCount.textContent = "0";
});

// Initial rendering
renderTodos(todos);
updateCompletedCount();