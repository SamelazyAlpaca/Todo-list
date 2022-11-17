import React from 'react'

const Form = ({setInputText, inputText, todos, setTodos, setStatus, setSelectedSort}) => {
    const inputTextHandler = (e) => {
        setInputText(e.target.value)
    }
    const submitTodoHandler = (e) => {
        let today = new Date()
        e.preventDefault()
        setTodos([
            ...todos, 
            {
                title: inputText, 
                completed: false, 
                id: todos.length + 1 , 
                date: Date.now(),
                createdDate: today.getDate() + '-' + parseInt(today.getMonth() + 1) + '-' + today.getFullYear(),
            }
        ])
        setInputText('')
    }
    const statusHandler = (e) => {
        setStatus(e.target.value)
    }

    return(
        <form>
            <div className='form-wrapper'>
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
            </div>
            <div className='select'>
                <select onChange={statusHandler} name="todo" className="filter-todo">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
            <div className="sort-wrapper">
                <p>Sort by date</p>
                    <button onClick={(e) => {
                        e.preventDefault()
                        setSelectedSort('up')
                        }}>
                        <i className="fa fa-arrow-down" aria-hidden="true"></i>
                    </button>
                    <button onClick={(e) => {
                        e.preventDefault()
                        setSelectedSort('down')
                        }}>
                        <i className="fa fa-arrow-up" aria-hidden="true"></i>
                    </button>
                </div>
        </form>
    )
}
export default Form;