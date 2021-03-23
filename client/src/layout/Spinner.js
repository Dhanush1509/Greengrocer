import React from 'react'
import {Spinner} from 'react-bootstrap'

const Loader = () => {
    return (
      <>
        <Spinner animation="border" variant="success" style={{marginTop:"20vh",height:"10vw",width:"10vw"}}/>
      </>
    );
}

export default Loader
