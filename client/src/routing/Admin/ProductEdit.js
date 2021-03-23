import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import productContext from "../../context/product/productContext";
import adminContext from "../../context/admin/AdminContext";
import alertContext from "../../context/alert/AlertContext";

import authContext from "../../context/auth/AuthContext";
import Loader from "../../layout/Spinner"
const ProductEditScreen = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [keywords, setKeywords]=useState("");
  const ProductContext = useContext(productContext);
  const AdminContext=useContext(adminContext);
  const AlertContext = useContext(alertContext);
  const {
    getProduct,
    product,
    getProductReset,
    loading
  } = ProductContext;
  const {userData}=useContext(authContext);
const {updateProductByAdmin,orderListLoading,success,adminMessage,clearAdminMessage} = AdminContext;
const {setAlert}=AlertContext
  useEffect(() => {
     if (userData) {
       if (userData.isAdmin === false) {
         props.history.push("/");
       }
     }
     if (userData.length === 0) {
       props.history.push("/");
     }
    if (!product) {
      getProduct(props.match.params.id);
    }
    
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setKeywords(product.keywords)
    }
    if(adminMessage){
      getProduct(props.match.params.id);
setAlert("Product updated Successfully","white","#56cc9d");
clearAdminMessage()
    }
    //eslint-disable-next-line
  }, [props.match.params.id,product,success,adminMessage]);

  const submitHandler = (e) => {
    e.preventDefault();
    updateProductByAdmin(
      { name, price, image, category, countInStock, description,keywords },
      props.match.params.id
    );
  };

  return (
    <>
      {orderListLoading ? (
        <Loader />
      ) : (
        <div className="form-container">
          <h1>Edit Product</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="stock">
              <Form.Control
                type="text"
                placeholder="count in stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Control
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="keywords">
              <Form.Control
                type="text"
                placeholder="Keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </div>
      )}
    </>
  );
};

export default ProductEditScreen;
