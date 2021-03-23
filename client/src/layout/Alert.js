import React,{useContext} from 'react';
import alertContext from "../context/alert/AlertContext";
import {Alert,Container} from "react-bootstrap";
import productContext from '../context/product/productContext';
import ReactJsAlert from "reactjs-alert";

function AlertComponent() {
    const AlertContext=useContext(alertContext);
    const {alerts}=AlertContext;
    const ProductContext=useContext(productContext);
    return alerts.map((alert, index) => (
      <Container className="p-1">
        <Alert className="mt-1" style={{color:alert.color,backgroundColor:alert.bgColor,fontFamily:"Roboto"}}>{alert.msg}</Alert>
        
      </Container>
    ));
}

export default AlertComponent
