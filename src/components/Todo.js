import React from 'react'

const Todo = ({title, todo, todos, setTodos, date, createdDate }) => {

    const deleteHandler = () => {
        setTodos(todos.filter(el => el.id !== todo.id))
    }
    const completeHandler = () => {
        setTodos(todos.map((item) => {
            if (item.id === todo.id) {
                return {
                    ...item, completed: !item.completed, date: date
                }
            }
            return item
        })
    )}
    return (
         <div className='todo'>
            <li className={`todo-item ${todo.completed ? "completed" : ''} `}>{title}</li>
            <li className='todo__item-date'>{createdDate}</li>
            <div className='button-wrapper'>
            <button onClick={completeHandler} className='complete-btn'>
                 <i className='fas fa-check'></i>
            </button>
             <button onClick={deleteHandler} className='trash-btn'>
                <i className='fas fa-trash'></i>
            </button>
            </div>
        </div>
    )
}
export default Todo;