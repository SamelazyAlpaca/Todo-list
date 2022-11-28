import React from 'react'
import { Button, Flex, Link, Text } from '@chakra-ui/react'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

const Pagination = ({ currentPage, pageNumbers, setCurrentPage }) => {
	const paginateHandler = pageNumber => setCurrentPage(pageNumber)
	const nextPage = () => setCurrentPage(prev => prev + 1)
	const prevPage = () => setCurrentPage(prev => prev - 1)

	return (
		<Flex className='pagination'>
			<Button
				className='btn btn-primary'
				disabled={currentPage === pageNumbers[0]}
				onClick={prevPage}>
				<ArrowLeftIcon />
				{/* <i className="fa fa-angle-double-left" aria-hidden="true" /> */}
			</Button>
			{
				pageNumbers.map(number => (
					<Text className={`page-item ${currentPage === number ? 'page-item-current' : ''}`} key={number}>
						<Link
							href="#"
							className='page-link'
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
				className='btn btn-primary'
				disabled={currentPage === pageNumbers.length}
				onClick={nextPage}>
				<ArrowRightIcon />
				{/* <i className="fa fa-angle-double-right" aria-hidden="true" /> */}
			</Button>
		</Flex>
	)
}

export default Pagination;