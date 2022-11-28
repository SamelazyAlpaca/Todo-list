// import Spinner from 'react-bootstrap/Spinner'
import { Spinner } from '@chakra-ui/react'

const Loader = () => {
  return (
    <Spinner 
      className='spinnerCentered' 
      color='blue.500'
      size="lg"
      speed='0.8s'
      thickness='3px'
      emptyColor='gray.400'
      display={'block'}
      textAlign={'center'}
    />
  );
}

export default Loader;