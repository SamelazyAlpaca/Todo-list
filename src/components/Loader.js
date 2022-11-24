import Spinner from 'react-bootstrap/Spinner'

const Loader = () => {
  return (
    <Spinner className='spinnerCentered' animation="border" role="status" variant='primary'>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default Loader;