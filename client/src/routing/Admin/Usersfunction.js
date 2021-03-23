import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Card,
  Container,
  ListGroup,
} from "react-bootstrap";

import AdminContext from "../../context/admin/AdminContext";
import alertContext from "../../context/alert/AlertContext";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
});

const Usersfunction = (props) => {
  const {
    getUserById,
    usersCount,
    adminMessage,
    adminError,
    error,
    userDetailsForAdmin,
    orderDetailsOfUserForAdmin,
    updateUserByAdmin,
    deleteUserByAdmin,
    clearAdminMessage,
  } = useContext(AdminContext);
  const { setAlert} = useContext(alertContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [updateFunction, setUpdateFunction] = useState(false);
  const [getFunction, setGetFunction] = useState(false);
  const [deleteFunction, setDeleteFunction] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    if (userDetailsForAdmin) {
      setName(userDetailsForAdmin.name);
      setEmail(userDetailsForAdmin.email);
      setIsVerified(userDetailsForAdmin.isVerified);
      setIsAdmin(userDetailsForAdmin.isAdmin);
    }

    if (adminMessage) {
      if (!userDetailsForAdmin) {
        clearAdminMessage();
        props.history.push("/admin");
      }
      if (adminMessage.message === "Updated Successfully") {
        setAlert(adminMessage.message, "white", "#56cc9d");
      } else if (adminMessage.message === "Deletion Successful") {
        setAlert(adminMessage.message, "white", "#56cc9d");
      }
    }
    if (error) {
      if (adminError.error === "Update failed!!") {
        setAlert(adminError.error, "white", "#dc3545");
      } else if (adminError.error === "User deletion unsuccessful") {
        setAlert(adminError.error, "white", "#dc3545");
      }
    }

    //eslint-disable-next-line
  }, [adminMessage, userDetailsForAdmin]);
  useEffect(
    () => {
      getUserById(props.match.params.id);
    },
    //eslint-disable-next-line
    []
  );

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, isAdmin, isVerified);
    updateUserByAdmin(props.match.params.id, {
      name,
      email,
      isAdmin,
      isVerified,
    });
    setUpdateFunction(false);
  };
  return (
    <>
      <Row x-lg={4}>
        <Col className="mx-auto mt-2">
          <Card
            style={{
              minWidth: "18rem",
              color: "white",
              background:
                "linear-gradient(45deg,rgb(50, 31, 219),rgb(31, 20, 152))",
              cursor: "pointer",
            }}
            onClick={() => {
              setGetFunction((prev) => !prev);
              if (updateFunction === true) {
                setUpdateFunction(false);
              }

              if (deleteFunction === true) {
                setDeleteFunction(false);
              }
            }}
          >
            <Card.Body>
              <Card.Title style={{ color: "white" }} as="h2">
                Get User
              </Card.Title>
              <Card.Text as="h4" style={{ color: "white" }}>
                <br />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mx-auto mt-2">
          <Card
            style={{
              minWidth: "18rem",
              color: "white",
              background:
                "linear-gradient(45deg, rgb(51, 153, 255), rgb(41, 130, 204))",
              cursor: "pointer",
            }}
            onClick={() => {
              setUpdateFunction((prev) => !prev);
              if (getFunction === true) {
                setGetFunction(false);
              }

              if (deleteFunction === true) {
                setDeleteFunction(false);
              }
            }}
          >
            <Card.Body>
              <Card.Title style={{ color: "white" }} as="h2">
                Update User
              </Card.Title>
              <Card.Text as="h4" style={{ color: "white" }}>
                <br />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mx-auto mt-2">
          <Card
            style={{
              minWidth: "18rem",
              color: "white",
              background: "linear-gradient(45deg,#e55353,#d93737)",
              cursor: "pointer",
            }}
            onClick={() => {
              setDeleteFunction((prev) => !prev);
              if (updateFunction === true) {
                setUpdateFunction(false);
              }

              if (getFunction === true) {
                setGetFunction(false);
              }
            }}
          >
            <Card.Body>
              <Card.Title style={{ color: "white" }} as="h2">
                Delete User
              </Card.Title>
              <Card.Text as="h4" style={{ color: "white" }}>
                <br />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <>
        {getFunction ? (
          <>
            {" "}
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">isVerified</TableCell>
                    <TableCell align="right">isAdmin</TableCell>
                    {orderDetailsOfUserForAdmin?orderDetailsOfUserForAdmin.map(order=>
                      <>
                        <TableCell align="right">order Id</TableCell>
                        <TableCell align="right">order createdAt</TableCell>
                        <TableCell align="right">
                        Delivery Address
                        </TableCell>
                        <TableCell align="right">
                          paymentOption
                        </TableCell>
                        <TableCell align="right">
                          deliveryPrice
                        </TableCell>{" "}
                        <TableCell align="right">taxPrice</TableCell>{" "}
                        <TableCell align="right">itemsPrice</TableCell>{" "}
                        <TableCell align="right">totalPrice</TableCell>
                        <TableCell align="right">isPaid</TableCell>{" "}
                        {order.orderedItemsData.map((c) => (
                          <>
                            <TableCell align="right">orderItemsData id</TableCell>{" "}
                            <TableCell align="right">product id</TableCell>{" "}
                            <TableCell align="right">product quantity</TableCell>
                         
                          </>
                        ))}
                        <TableCell align="right">isDelivered</TableCell>{" "}
                        <TableCell align="right">order UpdatedAt</TableCell>
                        </>
                      ):<></>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {userDetailsForAdmin.name}
                    </TableCell>
                    <TableCell align="right">
                      {userDetailsForAdmin.email}
                    </TableCell>
                    <TableCell align="right">
                      {userDetailsForAdmin.isVerified ? "true" : "false"}
                    </TableCell>
                    <TableCell align="right">
                      {userDetailsForAdmin.isAdmin ? "true" : "false"}
                    </TableCell>{" "}
                    {orderDetailsOfUserForAdmin?orderDetailsOfUserForAdmin.map((order) => (
                      <>
                        <TableCell align="right">{order._id}</TableCell>
                        <TableCell align="right">{order.createdAt}</TableCell>
                        <TableCell align="right">
                          {order.deliveryAddress.address},
                          {order.deliveryAddress.city},
                          {order.deliveryAddress.country},
                          {order.deliveryAddress.postalCode}
                        </TableCell>
                        <TableCell align="right">
                          {order.paymentOption}
                        </TableCell>
                        <TableCell align="right">
                          {order.deliveryPrice}
                        </TableCell>{" "}
                        <TableCell align="right">{order.taxPrice}</TableCell>{" "}
                        <TableCell align="right">{order.itemsPrice}</TableCell>{" "}
                        <TableCell align="right">{order.totalPrice}</TableCell>
                        <TableCell align="right">{order.isPaid?"true":"false"}</TableCell>{" "}
                        {order.orderedItemsData.map((c) => (
                          <>
                            <TableCell align="right">{c._id}</TableCell>{" "}
                            <TableCell align="right">{c.id}</TableCell>{" "}
                            <TableCell align="right">{c.quantity}</TableCell>
                          
                          </>
                        ))}
                        <TableCell align="right">{order.isDelivered?"true":"false"}</TableCell>{" "}
                        <TableCell align="right">{order.updatedAt}</TableCell>{" "}
                      </>
                    )):<></>}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <></>
        )}
      </>
      <>
        {deleteFunction ? (
          <>
            <div class="form-container">
              <Button
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() => {
                  deleteUserByAdmin(props.match.params.id);
                }}
              >
                Delete User
              </Button>
            </div>
          </>
        ) : (
          <></>
        )}
      </>
      <>
        {updateFunction ? (
          <div
            class="form-container"
            style={{ textAlign: "left", color: "black", margin: "none" }}
          >
            <h2 style={{ color: "black" }}>Update profile</h2>

            <Form onSubmit={onSubmit}>
              <Form.Group controlId="formGroupText">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  maxLength="30"
                />
              </Form.Group>
              <Form.Group controlId="formGroupEmail">
                <Form.Control
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Check
                className="mb-2"
                id="default-checkbox1"
                label="isAdmin"
                checked={isAdmin}
                onChange={(e) => {
                  setIsAdmin(e.target.checked);
                }}
              ></Form.Check>{" "}
              <Form.Check
                className="mb-2"
                id="default-checkbox2"
                label="isVerified"
                checked={isVerified}
                onChange={(e) => {
                  setIsVerified(e.target.checked);
                }}
              ></Form.Check>
              <Button variant="primary" type="submit">
                Edit Profile
              </Button>
            </Form>
          </div>
        ) : (
          <></>
        )}
      </>
    </>
  );
};

export default Usersfunction;
