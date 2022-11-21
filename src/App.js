import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import './App.css';
import Form from './components/Form';
import ToDoList from './components/TodoList';
import Loader from './components/Loader';
import Pagination from './components/Pagination';

function App() {
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState('all')
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedSort, setSelectedSort] = useState('up')
  const todosPerPage = 10

  const getTodos = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=50')
      setTodos(res.data)
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      console.error('Cant\`t get todos :', e.message);
      alert(`${e.message}, Please try again`)
    }
  }

  const paginateHandler = pageNumber => setCurrentPage(pageNumber)
  const nextPage = () => setCurrentPage(prev => prev + 1)
  const prevPage = () => setCurrentPage(prev => prev - 1)

  const dateByNew = () => {
    return [...todos].sort((a, b) => a.date - b.date)
  }
  const dateByOld = () => {
    return [...todos].sort((a, b) => b.date - a.date)
  }

  const sortByDate = () => {
    if (selectedSort === 'up') {
      return dateByNew()
    } else if (selectedSort === 'down') {
      return dateByOld()
    }
  }

  const sortTodos = useMemo(() => {
    const sortingTodos = sortByDate()
    const kek = sortingTodos || [];
    return kek
  }, [todos, selectedSort])

  const filterHandler = (arr) => {
    if (status === 'completed') {
      const tasks = arr.filter(todo => todo.completed == true)
      return tasks
    } else if (status === 'uncompleted') {
      const tasks = arr.filter(todo => todo.completed == false)
      return tasks
    } else {
      const tasks = arr
      return tasks
    }
  }

  const filterTodos = useMemo(() => {
    const filteredTodos = filterHandler(sortTodos)
    return filteredTodos || [];
  }, [todos, status, selectedSort, currentPage])

  const pageNumbers = []
  const paginationMemo = useMemo(() => {
    for ( let i= 1; i <= Math.ceil(filterTodos.length / todosPerPage); i++) {
        pageNumbers.push(i)
    }
    if (pageNumbers.length < currentPage) {
      setCurrentPage(pageNumbers[0])
    }
    const lastTodoIndex = currentPage * todosPerPage
    const firstTodoIndex = lastTodoIndex - todosPerPage 
    return filterTodos.slice(firstTodoIndex, lastTodoIndex)
  }, [todos, status, selectedSort, currentPage ])


  useEffect(() => {
    getTodos()
  }, []);

  useEffect(() => {
    sortByDate()
  }, [selectedSort])

  return (
    <div className="App">
      <div className='_container'>
        <header>
          <h1>Todo List</h1>
          <Form
            todos={todos}
            sortTodos={sortTodos}
            setTodos={setTodos}
            setStatus={setStatus}
            setSelectedSort={setSelectedSort}
          />
        </header>
        {isLoading ? (
          <Loader />
        ) : (
          <ToDoList
            todos={todos}
            todosList={paginationMemo}
            setTodos={setTodos}
          />
        )}
        {!todos.length && !isLoading
          ? <h2 style={{ marginTop: "2rem", padding: "1rem", textAlign: "center" }}>Список дел пуст... Самое время его пополнить!</h2>
          : null
        }
        {todos.length > todosPerPage ? (
          <Pagination
            currentPage={currentPage}
            paginateHandler={paginateHandler}
            pageNumbers={pageNumbers}
            // todosPerPage={todosPerPage}
            // totalTodos={todos.length}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
