import { useState } from 'react'
import Todo from './Todo'
import FilterButton from './FilterButton'

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

const initialTasks = [
  { id: 'todo-0', name: 'Learn React', completed: true },
  { id: 'todo-1', name: 'Add filters', completed: false },
  { id: 'todo-2', name: 'Add editing', completed: false }
]

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState('All')

  function addTask(name) {
    const newTask = {
      id: `todo-${Date.now()}`,
      name: name,
      completed: false
    }
    setTasks([...tasks, newTask])
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        return { ...task, completed: !task.completed }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id)
    setTasks(remainingTasks)
  }

  function editTask(id, newName) {
    const editedTasks = tasks.map(task => {
      if (id === task.id) {
        return { ...task, name: newName }
      }
      return task
    })
    setTasks(editedTasks)
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ))

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ))

  const tasksRemaining = tasks.filter(task => !task.completed).length

  return (
    <div className="todoapp stack-large">
      <h1>Todo List</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          const input = e.target.elements.newTaskName
          if (input.value.trim()) {
            addTask(input.value)
            input.value = ''
          }
        }}
      >
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="newTaskName"
          autoComplete="off"
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>

      <div className="filters btn-group stack-exception">
        {filterList}
      </div>

      <h2 id="list-heading">
        {tasksRemaining} {tasksRemaining === 1 ? 'task' : 'tasks'} remaining
      </h2>

      <ul className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  )
}

export default App