import axios from 'axios'
import { useRef } from 'react'
 
const Form = ({ getTodos, setStatus, selectedSort, setSelectedSort, setCurrentPage }) => {
	const ref = useRef(null)
	const submitTodoHandler = (e) => {
		e.preventDefault()
		if (ref.current.value.trim().length) {
			axios.post(`${process.env.REACT_APP_BASE_URL}task/${process.env.REACT_APP_userId}`,
				{
					name: ref.current.value.trim(),
					done: false,
					createdAt: new Date(),
					updatedAt: new Date(),
				})
				.then(() => {
					getTodos()
				})
				.catch((error) => {
					switch (error.response.status) {
						case 400:
							console.log('Error response:', error.response);
							alert(error.response.data.message)
							break;
						case 404:
							console.log('Error request:', error.response);
							alert(error.response.statusText)
							break;
						case 500:
							alert(error.response.data)
							break;
					}
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
	const dateHandler = () => {
		switch (selectedSort) {
			case 'asc':
				setSelectedSort('desc')
				break;
			case 'desc' :
				setSelectedSort('asc')
		}
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
					<i className='fas fa-plus-square' />
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
					<p onClick={dateHandler}>Sort by date</p>
					<button
						className={`sort-active ${selectedSort === 'asc' ? 'sort-active-up' : ''}`}
						onClick={(e) => {
							e.preventDefault()
							// setSelectedSort('desc')
							dateHandler()
						}}>
						<i className="fa fa-arrow-down" aria-hidden="true"></i>
					</button>
					{/* <button
						className={`${(selectedSort === 'asc') ? 'sort-active' : ''}`}
						onClick={(e) => {
							e.preventDefault()
							setSelectedSort('asc')
						}}>
						<i className="fa fa-arrow-up" aria-hidden="true"></i>
					</button> */}
				</div>
			</div>
		</form>
	)
}
export default Form;