import React,{useEffect,useContext} from 'react'
import authContext from "../context/auth/AuthContext";
import alertContext from "../context/alert/AlertContext";
import { Container } from 'react-bootstrap';
import g from "../assets/images/g.png";
import r from "../assets/images/r.png";
import e from "../assets/images/e.png";
import n from "../assets/images/n.png";
import o from "../assets/images/o.png";
import c from "../assets/images/c.png";
const Confirmation = (props) => {
    const {
      resendLink,
      clearErrors,
      clearMessages,
      message,
      error,
      confirmation
    } = useContext(authContext);
    const { setAlert } = useContext(alertContext);

    useEffect(() => {
        confirmation(props.match.params.email, props.match.params.token);
        //eslint-disable-next-line
    },[])
    useEffect(() =>{

if(error==="Your verification link may have expired. Please click on resend for verify your Email")
{
    setAlert(error,"white","red")
    clearErrors()
}
else if(error==="We were unable to find a user for this verification. Please SignUp!"){
     setAlert(error,"white","red")
    clearErrors()  
}
else if(message==="User has been already verified. Please Login"){
     setAlert(message, "white", "#56cc9d");
     clearMessages()
}
    
    //eslint-disable-next-line
    },[message,error])
    return (
      <Container className="mt-5">
        {message === "Verified Successfully,Please login" ? (
          <>
            <h1>{message}</h1> 
            <img src={g} alt="" style={{ width: "4vw", height: "auto" }} />
            <img src={r} alt="" style={{ width: "4vw", height: "auto" }} />
            <img src={e} alt="" style={{ width: "4vw", height: "auto" }} />
            <img src={e} alt="" style={{ width: "4vw", height: "auto" }} />
            <img src={n} alt="" style={{ width: "4vw", height: "auto" }} />
            <img src={g} alt="" style={{ width: "4vw", height: "auto" }} />
            <img src={r} alt="" style={{ width: "4vw", height: "auto" }} />
            <img src={o} alt="" style={{ width: "4vw", height: "auto" }} />
            <img src={c} alt="" style={{ width: "4vw", height: "auto" }} />
            <img src={e} alt="" style={{ width: "4vw", height: "auto" }} />
            <img src={r} alt="" style={{ width: "4vw", height: "auto" }} />
          </>
        ) : (
          <></>
        )}
      </Container>
    );
}

export default Confirmation
