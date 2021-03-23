import React,{useState,useContext,useEffect} from 'react'
import { Container,Form,Button } from "react-bootstrap";
import authContext from "../context/auth/AuthContext"
import alertContext from "../context/alert/AlertContext"
const Resend = () => {


  const [email, setEmail] = useState("");
const {resendLink,clearErrors,clearMessages,message,error}=useContext(authContext)
const {setAlert}=useContext(alertContext)
     const onChange = (e) =>
       setEmail( e.target.value);
    const onSubmit = (e) => {
      e.preventDefault();
      if (email === "") {
        setAlert("email field cannot be empty", "white", "red");
        clearErrors();
      } else {
        resendLink({email});
      }
    };
    useEffect(()=>{
      if(message){
        if(message.substring(0,14)==="A verification"){
          setAlert(message, "white", "#56cc9d");
          clearMessages();
        }

      }
if(message==="This account has been already verified. Please log in.")
{
   setAlert(message, "white", "#56cc9d");
   clearMessages();
}
if(error==="We were unable to find a user with that email. Make sure your Email is correct!"){
 setAlert(error, "white", "red");
 clearErrors();

  }
  }
    //eslint-disable-next-line
    ,[message,error])
    return (
      <Container className="mt-5">
        <div
          className="form-container"
          style={{ textAlign: "left", color: "black" }}
        >
        Enter email address to receive a verification link and then click resend
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formGroupEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Resend
            </Button>
          </Form>
        </div>
      </Container>
    );
}

export default Resend


   