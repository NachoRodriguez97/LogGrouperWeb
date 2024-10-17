import React from 'react';
import { Spinner } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

const LoadingSpinner = () => {

    const spinnerStyle = {
      marginTop: '20%',
      marginBottom: '20%',
      marginLeft: '50%',
      marginRight: '50%'
    }
  return (
    <>
      <br />
        <Spinner style={spinnerStyle} color='primary' />
    </>
  );
};

export default LoadingSpinner;
