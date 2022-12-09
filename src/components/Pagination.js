import React, { useEffect, useMemo } from 'react'
import { Button, Flex, Link, Text } from '@chakra-ui/react'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

const Pagination = ({ todos, error, todosCount, todosPerPage, currentPage, status, setCurrentPage }) => {

	const paginateHandler = pageNumber => setCurrentPage(pageNumber)
	const nextPage = () => setCurrentPage(prev => prev + 1)
	const prevPage = () => setCurrentPage(prev => prev - 1)

	const pageNumbers = []
	const paginationMemo = useMemo(() => {
		for (let i = 1; i <= Math.ceil(todosCount / todosPerPage); i++) {
			pageNumbers.push(i)
		}
	}, [todos, status, currentPage, error])

	useEffect(() => {
		if (todos.length < 1) {
			setCurrentPage(pageNumbers.length)
		}
	}, [todosCount])

	return (
		<Flex justify="center" >
			<Button
				disabled={currentPage === pageNumbers[0]}
				onClick={prevPage}
				h="100%"
				bg="#0d6efdbf"
				px="0.5rem"
				py="0"
				fontSize="xs"
				minW={7}
				color="#fff"
				borderRadius="0.3rem 0 0 0.3rem"
				_hover={{ bg: "#0d6efd" }}
			>
				<ArrowLeftIcon
					h="auto"
					py={2}
				/>
			</Button>
			{
				pageNumbers.map(number => (
					<Text className={`${currentPage === number ? 'page-item-current' : ''}`} key={number}>
						<Link
							href="#"
							px={2}
							py=".35rem"
							bg="#fff"
							lineHeight={1.9}
							color="#0d6efdbf"
							borderRight="1px solid #00000024"
							_hover={{
								textDecoration: "none", bg: "#dee2e6cf"
							}}
							onClick={(e) => {
								e.preventDefault()
								paginateHandler(number)
							}}
						>
							{number}
						</Link>
					</Text>
				))
			}
			<Button
				disabled={currentPage === pageNumbers.length}
				onClick={nextPage}
				h="100%"
				bg="#0d6efdbf"
				px="0.5rem"
				py="0"
				fontSize="xs"
				minW={7}
				color="#fff"
				borderRadius="0 0.3rem 0.3rem 0"
				_hover={{ bg: "#0d6efd" }}
			>
				<ArrowRightIcon
					h="auto"
					py={2}
				/>
			</Button>
		</Flex>
	)
}

export default Pagination;