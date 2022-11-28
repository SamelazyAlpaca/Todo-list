import axios from 'axios'
import { useRef } from 'react'
import {
	Input,
	InputGroup,
	InputRightAddon,
	Button,
	Box,
	Select,
} from '@chakra-ui/react';
import {
	ArrowDownIcon,
	AddIcon,
} from '@chakra-ui/icons'

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
			case 'desc':
				setSelectedSort('asc')
		}
	}

	return (
		<form>
			<InputGroup
				className='form-wrapper'
				width="auto"
			>
				<Input
					width='auto'
					bg='#fff'
					ref={ref}
					type="text"
					placeholder="I'm going to..."
					className="todo-input"
				/>
				<InputRightAddon
					padding="0"
					margin="0"
					border="none"
				>
					<Button
						borderLeftRadius="0"
						onClick={submitTodoHandler}
						className="todo-button"
						type="submit"
					>
						{/* <AddIcon fontSize="1.1rem" /> */}
						<i className='fas fa-plus-square' />
					</Button>
				</InputRightAddon>
			</InputGroup>
			<Box className='filtering-wrapper'>
				{/* <div className='select'> */}
				<Select
					onChange={statusHandler}
					className="select filter-todo"
					width="auto"
					background="auto"
				>
					<option value="">All</option>
					<option value="done">Done</option>
					<option value="undone">Undone</option>
				</Select>
				<Box className="sort-wrapper">
					<p onClick={dateHandler}>Sort by date</p>
					<Button
						className={`sort-active ${selectedSort === 'asc' ? 'sort-active-up' : ''}`}
						px={0}
						py={0}
						minW={8}
						minH={5}
						onClick={(e) => {
							e.preventDefault()
							// setSelectedSort('desc')
							dateHandler()
						}}>
						{/* <i className="fa fa-arrow-down" aria-hidden="true"></i> */}
						<ArrowDownIcon fontSize="1.2rem" />
					</Button>
				</Box>
			</Box>
		</form>
	)
}
export default Form;