import React, { useRef, useState } from 'react'

const Todo = ({ todo, todos, setTodos, createdDate }) => {
	const [readOnly, setReadOnly] = useState(true)
	const inputFocus = useRef(null)

	const deleteHandler = () => {
		setTodos(todos.filter(el => el.id !== todo.id))
	}

	const completeHandler = () => {
		todos.find((item) => {
			if (item.id === todo.id) {
				todo.completed = !todo.completed
			}
		})
		setTodos([...todos])
	}
	const editHandler = () => {
		todos.find((item) => {
			if (item.id === todo.id) {
				setReadOnly(false)
				inputFocus.current.focus()
			}
		})
	}


	const keydownBlurInput = (e) => {
		if (e.target.readOnly === false && e.key === 'Escape') {
			inputFocus.current.value = e.target.defaultValue
			setReadOnly(true)
			e.target.blur()
		} else if (e.target.readOnly === false && e.key === 'Enter') {
			todos.find((item) => {
				if (item.id === todo.id) {
					todo.title = inputFocus.current.value
				}
				return item
			})
			setTodos([...todos])
			e.target.blur()
		}
	}
	const inputOnBlur = (e) => {
	   setReadOnly(true)
   }

	return (
		<div className='todo'>
			<input
				onKeyDown={keydownBlurInput}
				onBlur={inputOnBlur}
				ref={inputFocus}
				readOnly={readOnly}
				defaultValue={todo.title}
				className={`todo-item ${todo.completed ? "completed" : ''} ${readOnly ? '' : 'todo-item-border'}`}
			/>
			<li className='todo-item-date'>{createdDate}</li>
			<div className='button-wrapper'>
				<button onClick={editHandler} className='edit-btn'>
					<i className="fas fa-edit" />
				</button>
				<button onClick={completeHandler} className='complete-btn'>
					<i className='fas fa-check' />
				</button>
				<button onClick={deleteHandler} className='trash-btn'>
					<i className='fas fa-trash' />
				</button>
			</div>
		</div>
	)
}
export default Todo;