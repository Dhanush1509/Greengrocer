import React from 'react'
import {Container,Alert,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Confirm = () => {
    return (
      <Container className="mt-5" style={{ color: "black" }}>
        <>
          <Alert variant="light">
            <Alert.Heading>Check your Inbox</Alert.Heading>
            <p>
              You will receive a confirmation mail shortly. click the link that
              you've received. It will redirect you to the confirmation
              page.After receiving success message, Please Login.
            </p>
            <hr />
            <div className="d-flex justify-content-end">
              <Link to="/email/resend">
                <Button variant="outline-success">
                  {" "}
                  Did n't receive email?? Click here to resend.
                </Button>
              </Link>
            </div>
          </Alert>
        </>
    
      </Container>
    );
}

export default Confirm
