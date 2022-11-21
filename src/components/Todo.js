import React, { useRef, useState } from 'react'

const Todo = ({title, todo, todos, setTodos, createdDate }) => {
    const [readOnly, setReadOnly] = useState(true)
    const inputFocus = useRef(null)
    const deleteHandler = () => {
        setTodos(todos.filter(el => el.id !== todo.id))
    }
    const completeHandler = () => {
        setTodos(todos.map((item) => {
            if (item.id === todo.id) {
                return {
                    ...item, completed: !item.completed
                }
            }
            return item
        })
    )}
    const editHandler = () => {
        setTodos(todos.map(item => {
            if ( item.id === todo.id) {
                setReadOnly(false)
                inputFocus.current.focus()
                return {
                    ...item
                }
            }
            return item
        }
        )) 
    }

    const keydownBlurInput = (e) => {
        if (e.target.readOnly == false && e.key === 'Escape') {
            inputFocus.current.value = e.target.defaultValue
            setReadOnly(e.target.readOnly = true)
            e.target.blur()
        } else if (e.target.readOnly == false && e.key === 'Enter') {
            setTodos(todos.map(item => {
                if (item.id == todo.id) {
                    return {
                        ...item, title: inputFocus.current.value
                    }
                }
                return item
            }))
            e.target.blur()
        }
    }
    const inputOnBlur = (e) => {
        setReadOnly(e.target.readOnly = true)
    }
    
    return (
         <div className='todo'>
            <input 
                onKeyDown={keydownBlurInput} 
                onBlur={inputOnBlur} 
                ref={inputFocus} 
                readOnly={readOnly}  
                defaultValue={title} 
                className={`todo-item ${todo.completed ? "completed" : ''} ${readOnly ? '' : 'todo-item-border'}`} 
            />
            <li className='todo-item-date'>{createdDate}</li>
            <div className='button-wrapper'>
                <button onClick={editHandler} className='edit-btn'>
                    <i className="fas fa-edit"></i>
                </button>
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