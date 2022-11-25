import axios from 'axios'
import { useRef } from 'react'

const Form = ({ todos, setTodos,getTodos, setStatus, selectedSort, setSelectedSort, setCurrentPage }) => {
	const ref = useRef(null)
	const submitTodoHandler = (e) => {
		e.preventDefault()
		if (ref.current.value.trim().length) {
			axios.post('https://todo-api-learning.herokuapp.com/v1/task/8',
			{
				name: ref.current.value.trim(),
				done: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			}, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(() => {
				getTodos()
			})
			ref.current.value = ''
		} else {
			ref.current.closest('.form-wrapper').classList.add('input-wrong')
			setTimeout(() => {
				ref.current.closest('.form-wrapper').classList.remove('input-wrong')
			}, 2000)
		}
	}

	const statusHandler = (e) => {
		setStatus(e.target.value)
		setCurrentPage(1)
	}

	return (
		<form>
			<div className='form-wrapper'>
				<input
					ref={ref}
					type="text"
					placeholder="I'm going to..."
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
			<div className='filtering-wrapper'>
				<div className='select'>
					<select onChange={statusHandler} name="todo" className="filter-todo">
						<option value="">All</option>
						<option value="done">Done</option>
						<option value="undone">Undone</option>
					</select>
				</div>
				<div className="sort-wrapper">
					<p>Sort by date</p>
					<button
						className={`${(selectedSort === 'desc') ? 'sort-active' : ''}`}
						onClick={(e) => {
							e.preventDefault()
							setSelectedSort('desc')
						}}>
						<i className="fa fa-arrow-down" aria-hidden="true"></i>
					</button>
					<button
						className={`${(selectedSort === 'asc') ? 'sort-active' : ''}`}
						onClick={(e) => {
							e.preventDefault()
							setSelectedSort('asc')
						}}>
						<i className="fa fa-arrow-up" aria-hidden="true"></i>
					</button>
				</div>
			</div>
		</form>
	)
}
export default Form;