import './style.css'

// Icon SVG
const icons = {
  add: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
  complete: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  delete: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`
}

// App Template
document.querySelector('#app').innerHTML = `
  <div class="glass todo-container">
    <div class="todo-header">
      <input type="text" class="todo-input" placeholder="Thêm công việc mới...">
      <button class="add-btn">${icons.add} Thêm</button>
    </div>
    <ul class="todo-list"></ul>
  </div>
`

// Todo List Logic
const todoInput = document.querySelector('.todo-input')
const addBtn = document.querySelector('.add-btn')
const todoList = document.querySelector('.todo-list')

let todos = []

function renderTodos() {
  todoList.innerHTML = todos.map((todo, index) => `
    <li class="todo-item ${todo.completed ? 'completed' : ''}">
      <div class="todo-content">
        <button class="icon-btn complete-btn" data-index="${index}">
          ${icons.complete}
        </button>
        <span>${todo.text}</span>
      </div>
      <div class="todo-actions">
        <button class="icon-btn delete-btn" data-index="${index}">
          ${icons.delete}
        </button>
      </div>
    </li>
  `).join('')
}

function addTodo() {
  const text = todoInput.value.trim()
  if (text) {
    todos.push({ text, completed: false })
    todoInput.value = ''
    renderTodos()
  }
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed
  renderTodos()
}

function deleteTodo(index) {
  todos.splice(index, 1)
  renderTodos()
}

// Event Listeners
addBtn.addEventListener('click', addTodo)
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTodo()
})

todoList.addEventListener('click', (e) => {
  const index = e.target.closest('button')?.dataset?.index
  if (e.target.closest('.complete-btn')) {
    toggleComplete(index)
  }
  if (e.target.closest('.delete-btn')) {
    deleteTodo(index)
  }
})
