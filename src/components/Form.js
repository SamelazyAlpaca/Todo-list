import axios from 'axios'
import { useRef } from 'react'
import uuid from 'react-uuid'

const Form = ({ todos, setTodos, setStatus, selectedSort, setSelectedSort, setCurrentPage }) => {
	const ref = useRef(null)
	const unique_id = uuid()
	const submitTodoHandler = (e) => {
		e.preventDefault()
		if (ref.current.value.trim().length) {
			axios.post('https://todo-api-learning.herokuapp.com/v1/task/5',
			{
				"uuid": unique_id,
				"name": ref.current.value.trim(),
				"done": false,
				"userId": 5,
				// dateSort: Date.now(),
				"createdAt": new Date(),
			}, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((response) => {
				console.log('response uuid', response.data);
				console.log(todos);
				setTodos([...todos, response.data])
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
						<option value="all">All</option>
						<option value="completed">Completed</option>
						<option value="uncompleted">Uncompleted</option>
					</select>
				</div>
				<div className="sort-wrapper">
					<p>Sort by date</p>
					<button
						className={`${(selectedSort === 'down') ? 'sort-active' : ''}`}
						onClick={(e) => {
							e.preventDefault()
							setSelectedSort('down')
						}}>
						<i className="fa fa-arrow-down" aria-hidden="true"></i>
					</button>
					<button
						className={`${(selectedSort === 'up') ? 'sort-active' : ''}`}
						onClick={(e) => {
							e.preventDefault()
							setSelectedSort('up')
						}}>
						<i className="fa fa-arrow-up" aria-hidden="true"></i>
					</button>
				</div>
			</div>
		</form>
	)
}
export default Form;