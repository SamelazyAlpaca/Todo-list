import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import './App.css';
import Form from './components/Form';
import ToDoList from './components/TodoList';
import Loader from './components/Loader';
import Pagination from './components/Pagination';

function App() {
  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState('all')
  const [filteredTodos, setFilteredTodos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const todosPerPage = 10
  const [selectedSort, setSelectedSort] = useState('')

  const getTodos = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=70')
      setTodos(res.data)
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      console.error('Cant\`t get todos :', e.message);
      alert(`${e.message}, Please try again`)
    }
  }

  const lastTodoIndex = currentPage * todosPerPage
  const firstTodoIndex = lastTodoIndex - todosPerPage
  const currentTodos = todos.slice(firstTodoIndex, lastTodoIndex)
  
  const paginateHandler = pageNumber => setCurrentPage(pageNumber)
  const nextPage = () => setCurrentPage(prev => prev + 1)
  const prevPage = () => setCurrentPage(prev => prev - 1)
  
  const filterHandler = () => {
    switch(status){
      case 'completed' :
        setFilteredTodos(todos.filter(todo => todo.completed == true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed == false))
        break;
      default :
        setFilteredTodos(currentTodos)
        break;
    }
  };
  const sortByDate = () => {
    if (selectedSort === 'up') {
     const dateUp = [...todos].sort((a, b) => a.date - b.date)
     setTodos(dateUp)
    } else if(selectedSort === 'down') {
      const dateDown = [...todos].sort((a, b) => b.date - a.date)
      setTodos(dateDown)
    }
  }
 
  useEffect(() => {
    getTodos()
  }, []);

  useEffect(() => {
    filterHandler();
  }, [todos, status, currentPage]);

  useEffect(() => {
    sortByDate()
  }, [selectedSort])
  
  return (
    <div className="App">
      <div className='_container'>
      <header>
      <h1>Todo List</h1>
      <Form 
        inputText={inputText} 
        todos={todos} 
        setTodos={setTodos} 
        setInputText={setInputText} 
        setStatus={setStatus}
        setSelectedSort={setSelectedSort}
      />
      </header>
      { isLoading ? (
        <Loader />
      ) : (
        <ToDoList
        todos={todos}
        filteredTodos={filteredTodos} 
        setTodos={setTodos} 
      />
      )}
      <Pagination 
        currentPage = {currentPage}
        paginateHandler = {paginateHandler}
        todosPerPage = {todosPerPage}
        totalTodos = {todos.length}
        nextPage = {nextPage}
        prevPage = {prevPage}
      />
      </div>
    </div>
  );
}

export default App;
