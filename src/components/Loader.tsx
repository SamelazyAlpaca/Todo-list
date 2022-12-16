import { Spinner } from '@chakra-ui/react'
import React from 'react';

const Loader = () => {
	return (
		<Spinner
			color='blue.500'
			w={14}
			h={14}
			speed='0.8s'
			thickness='3px'
			emptyColor='gray.400'
			m='-1.75rem auto 0 auto'
			pos='absolute'
			top='50%'
			left='50%'
			zIndex='10'
			pointerEvents='none'
		/>
	);
}

export default Loader;