import React, { useState } from 'react'

const Form = ({setInputText, inputText, todos, setTodos, setStatus}) => {

    const inputTextHandler = (e) => {
        setInputText(e.target.value)
    }
    const submitTodoHandler = (e) => {
        e.preventDefault()
        setTodos([
            ...todos, 
            {title: inputText, completed: false, id: todos.length + 1 }
        ])
        setInputText('')
    }
    const statusHandler = (e) => {
        setStatus(e.target.value)
    }
    return(
        <form>
            <input 
                value={inputText} 
                onChange={inputTextHandler} 
                type="text" 
                className="todo-input" 
            />
            <button 
                onClick={submitTodoHandler} 
                className="todo-button" 
                type="submit" 
            >
                <i className='fas fa-plus-square'></i>
            </button>
            <div className='select'>
                <select onChange={statusHandler} name="todo" className="filter-todo">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
        </form>
    )
}
export default Form;