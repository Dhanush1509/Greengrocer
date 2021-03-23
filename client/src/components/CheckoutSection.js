import React from 'react'
import { Nav,Container,Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Badge from "@material-ui/core/Badge";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";


const CheckoutSection = (props) => {
    return (
      <Container className="mt-1">
        <Navbar expand="lg" collapseOnSelect>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            style={{ fontFamily: "Roboto" }}
          >
            {" "}
            <Nav className="m-auto">
              <Nav.Item>
                {props.step1 ? (
                  <LinkContainer to="/signin">
                    <Nav.Link className="mr-5">
                    
                        Sign In
                      
                    </Nav.Link>
                  </LinkContainer>
                ) : (
                  <Nav.Link className="mr-5" disabled>
                    Sign In
                  </Nav.Link>
                )}
              </Nav.Item>

              <Nav.Item>
                {props.step2 ? (
                  <LinkContainer to="/address">
                    <Nav.Link className="mr-5">Delivery Address</Nav.Link>
                  </LinkContainer>
                ) : (
                  <Nav.Link className="mr-5" disabled>
                    Shipping
                  </Nav.Link>
                )}
              </Nav.Item>

              <Nav.Item>
                {props.step3 ? (
                  <LinkContainer to="/payment">
                    <Nav.Link className="mr-5">Payment</Nav.Link>
                  </LinkContainer>
                ) : (
                  <Nav.Link className="mr-5" disabled>
                    Payment
                  </Nav.Link>
                )}
              </Nav.Item>

              <Nav.Item>
                {props.step4 ? (
                  <LinkContainer to="/placeorder">
                    <Nav.Link className="mr-5">Place Order</Nav.Link>
                  </LinkContainer>
                ) : (
                  <Nav.Link className="mr-5" disabled>
                    Place Order
                  </Nav.Link>
                )}
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    );
}

export default CheckoutSection
