import { useRef } from 'react'
import {
	Input,
	InputGroup,
	InputRightAddon,
	Button,
	Box,
	Select,
	Text,
} from '@chakra-ui/react';
import {
	ArrowDownIcon,
} from '@chakra-ui/icons'
import { postOneTask } from '../services/axios-instance';

const Form = ({ setError, getTodos, setStatus, selectedSort, setSelectedSort, setCurrentPage }) => {
	const ref = useRef(null)
	const submitTodoHandler = async (e) => {
		e.preventDefault()
		if (ref.current.value.trim().length) {
			try {
				await postOneTask(ref)
				getTodos()
			} catch (error) {
				setError(error.response.data.message)
			}
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
				border="2px solid transparent"
				borderRadius="0.475rem"
				positio="relative"
			>
				<Input
					width='auto'
					bg='#fff'
					ref={ref}
					type="text"
					placeholder="I'm going to..."
					_focus={{ borderColor: "transparent" }}
				/>
				<InputRightAddon
					padding="0"
					margin="0"
					border="none">
					<Button
						borderLeftRadius="0"
						onClick={submitTodoHandler}
						color="#ff6f47"
						background="#f7fffe"
						cursor="pointer"
						transition=" all 0.3s ease"
						type="submit"
						_hover={{
							background: "#ff6f47",
							color: "white"
						}}
					>
						<i className='fas fa-plus-square' />
					</Button>
				</InputRightAddon>
			</InputGroup>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="space-around"
			>
				<Select
					onChange={statusHandler}
					py="0"
					fontFamily="Poppins, sans-serif"
					width="auto"
					background="#fff"
					w="10rem"
					color="#ff6f47"
					cursor="pointer"
				>
					<option value="">All</option>
					<option value="done">Done</option>
					<option value="undone">Undone</option>
				</Select>
				<Box
					display="flex"
					alignItems="center"
					justifyContent="space-evenly"
					marginLeft="1rem"
				>
					<Text
						marginRight="15px"
						cursor="pointer"
						color="#fff"
						onClick={dateHandler}>
						Sort by date
					</Text>
					<Button
						className={`sort-active ${selectedSort === 'asc' ? 'sort-active-up' : ''}`}
						px={0}
						py={0}
						minW={8}
						minH={5}
						_hover={{ opacity: "0.8" }}
						onClick={(e) => {
							e.preventDefault()
							dateHandler()
						}}>
						<ArrowDownIcon fontSize="1.2rem" />
					</Button>
				</Box>
			</Box>
		</form>
	)
}
export default Form;