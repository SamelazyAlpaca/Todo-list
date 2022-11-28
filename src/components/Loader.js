// import Spinner from 'react-bootstrap/Spinner'
import { Spinner } from '@chakra-ui/react'

const Loader = () => {
	return (
		<Spinner
			color='blue.500'
			size="lg"
			speed='0.8s'
			thickness='3px'
			emptyColor='gray.400'
			display='flex'
			textAlign='center'
			m='0 auto'
		/>
	);
}

export default Loader;