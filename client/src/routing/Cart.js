import React, { useContext, useState, useEffect } from "react";
import cartContext from "../context/cart/cartContext";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import ReactJsAlert from "reactjs-alert";
import Lottie from "react-lottie";
import animationData from "../assets/reactLottie/emptyCart.json";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Form,
  Card,
  Container,
} from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function Cart() {
  const CartContext = useContext(cartContext);
  const {
    cartItems,
    addToCart,
    deleteItemFromCart,
    totalCost,
    total,
    deliveryAddress,
    paymentOption,
  } = CartContext;
  const classes = useStyles();
  const [status, setStatus] = useState(true);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    totalCost();

    //eslint-disable-next-line
  }, [cartItems]);
  return cartItems.length > 0 ? (
    <div
      className="mt-4"
      style={{
        fontFamily:
          "Montserrat,-apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif",
      }}
    >
      <Row>
        <Col md={8}>
          <h2 style={{ textAlign: "left" }} className="m-3">
            SHOPPING CART
          </h2>
          <ListGroup style={{ textAlign: "center" }}>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id}>
                {" "}
                <Row>
                  <Col
                    md={1}
                  >
                    {" "}
                    <Image
                      src={item.image}
                      alt={item.name}
                      className={window.innerWidth > 720 ?"mb-2 mt-3":"mb-2 w-25"}
                      rounded
                      
                  
                    />
                  </Col>
                  <Col md={3} className="my-auto">
                    <Link to={`/products/${item.id}`}>
                      <h5>{item.name}</h5>{" "}
                    </Link>
                  </Col>
                  <Col md={3} className="my-auto">
                    {" "}
                    <h6>₹{item.price}/kg</h6>
                  </Col>
                  <Col md={4} className="my-auto">
                    <Row>
                      <Col sm="12">
                        {" "}
                        <form
                          className={classes.root}
                          noValidate
                          autoComplete="off"
                        >
                          <TextField
                            id="outlined-select-currency-native"
                            select
                            label={
                              item.quantity > 1 ? "Qty in kgs" : "Qty in kg"
                            }
                            value={item.quantity}
                            variant="outlined"
                            onChange={(e) =>
                              addToCart(
                                item.id,
                                item.addBool,
                                Number(e.target.value)
                              )
                            }
                          >
                            {[...Array(item.countInStock * 4).keys()].map(
                              (x) => (
                                <MenuItem key={x + 1} value={(x + 1) / 4}>
                                  {(x + 1) / 4}
                                </MenuItem>
                              )
                            )}
                          </TextField>
                        </form>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={1} className="my-auto">
                    <IconButton onClick={() => deleteItemFromCart(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          {" "}
          <ListGroup className="mt-5">
            <ListGroup.Item style={{ color: "black" }}>
              <h2>Subtotal ({cartItems.length}) items</h2>₹{total}
            </ListGroup.Item>
            <ListGroup.Item>
              <Link
                to={
                  deliveryAddress.length > 0
                    ? "/payment"
                    : paymentOption.length > 0
                    ? "/placeorder"
                    : "/address"
                }
                style={{ textDecoration: "none" }}
              >
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  // onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  ) : (
    <Container className="pt-5" style={{ textAlign: "left" }}>
      <h4>
        {" "}
        Your cart is empty &nbsp;
        <Link to="/">Go back</Link>
      </h4>

      <Lottie
        options={defaultOptions}
        style={{ width: "50%", height: "auto" }}
      />
    </Container>
  );
}

export default Cart;

/*  <Form.Control
                          as="select"
                          value={item.quantity}
                          onChange={(e) =>
                            addToCart(
                              item.id,
                              item.addBool,
                              Number(e.target.value)
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={(x + 1) / 4}>
                              {(x + 1) / 4}
                            </option>
                          ))}
                          </Form.Control>
                          */

//  <Container className="mt-5">
//         <Row>
//           <Col
//             md={8}
//             style={{ boxShadow: "1px 10px 1px 10px rgba(0,0,0,0.1)" }}
//           >
//             <h1>Shopping Cart</h1>
//             <ListGroup variant="flush">
//               {cartItems.map((item) => (
//                 <ListGroup.Item key={item.product}>
//                   <Row>
//                     <Col md={2}>
//                       <Image src={item.image} alt={item.name} fluid rounded />
//                     </Col>
//                     <Col md={3}>
//                       <Link to={`/product/${item.product}`}>{item.name}</Link>
//                     </Col>
//                     <Col md={2}>${item.price}</Col>
//                     <Col md={2}>
//                       <Form.Control
//                         as="select"
//                         value={item.qty}
//                         //   onChange={(e) =>
//                         // dispatch(
//                         //   addToCart(item.product, Number(e.target.value))
//                         // )
//                         //   }
//                       >
//                         {[...Array(item.countInStock).keys()].map((x) => (
//                           <option key={x + 1} value={(x + 1) / 4}>
//                             {(x + 1) / 4}
//                           </option>
//                         ))}
//                       </Form.Control>
//                     </Col>
//                     <Col md={2}>
//                       <Button
//                         type="button"
//                         variant="light"
//                         //   onClick={() => removeFromCartHandler(item.product)}
//                       >
//                         <i className="fas fa-trash"></i>
//                       </Button>
//                     </Col>
//                   </Row>
//                 </ListGroup.Item>
//               ))}
//             </ListGroup>

//           </Col>
//           <Col md={4}>
//             <Card>
//               <ListGroup variant="flush">
//                 <ListGroup.Item>
//                   <h2>
//                     Subtotal (
//                     {cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
//                   </h2>
//                   $
//                   {cartItems
//                     .reduce((acc, item) => acc + item.qty * item.price, 0)
//                     .toFixed(2)}
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <Button
//                     type="button"
//                     className="btn-block"
//                     disabled={cartItems.length === 0}
//                     // onClick={checkoutHandler}
//                   >
//                     Proceed To Checkout
//                   </Button>
//                 </ListGroup.Item>
//               </ListGroup>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
