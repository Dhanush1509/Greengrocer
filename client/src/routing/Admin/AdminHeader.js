import React, { useContext} from "react";
import { Row, Col,Card} from "react-bootstrap";
import AdminContext from "../../context/admin/AdminContext";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import {Link} from "react-router-dom"
import Loader from "../../layout/Spinner"

const AdminHeader = () => {
    const { usersCount,ordersCount,paymentsCount,pendingDeliveredItemsCount,deliveredItemsCount,orderListLoading } = useContext(AdminContext);

  return orderListLoading ? (
    <>
      <Loader />
    </>
  ) : (
    <>
      <Row x-lg={4}>
        <Col className="mx-auto mt-2">
          <Card
            style={{
              minWidth: "18rem",
              color: "white",
              background:
                "linear-gradient(45deg,rgb(50, 31, 219),rgb(31, 20, 152))",
            }}
          >
            <Card.Body>
              <Card.Title style={{ color: "white" }} as="h2">
                Users Count
              </Card.Title>
              <Card.Text as="h4" style={{ color: "white" }}>
                {usersCount}
              </Card.Text>
              <div style={{ textAlign: "right" }}>
                <Link to="/admin/userslist" style={{ color: "white" }}>
                  <ArrowForwardIcon />
                </Link>
              </div>
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
            }}
          >
            <Card.Body>
              <Card.Title style={{ color: "white" }} as="h2">
                Products Count
              </Card.Title>
              <Card.Text as="h4" style={{ color: "white" }}>
                {usersCount}
              </Card.Text>
              <div style={{ textAlign: "right" }}>
                <Link to="/admin/productslist" style={{ color: "white" }}>
                  <ArrowForwardIcon />
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mx-auto mt-2">
          <Card
            style={{
              minWidth: "18rem",
              color: "white",
              background: "linear-gradient(45deg,#e55353,#d93737)",
            }}
          >
            <Card.Body>
              <Card.Title style={{ color: "white" }} as="h2">
                Total Payments
              </Card.Title>
              <Card.Text as="h4" style={{ color: "white" }}>
                ₹{paymentsCount}
              </Card.Text>
              <div style={{ textAlign: "right" }}>
                <ArrowForwardIcon />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mx-auto mt-2">
          <Card
            style={{
              minWidth: "18rem",
              color: "white",
              background: "linear-gradient(45deg,#f9b115,#f6960b)",
            }}
          >
            <Card.Body>
              <Card.Title style={{ color: "white" }} as="h2">
                Orders Received
              </Card.Title>
              <Card.Text as="h4" style={{ color: "white" }}>
                {ordersCount}
              </Card.Text>
              <div style={{ textAlign: "right" }}>
                <Link to="/admin/orderslist" style={{ color: "white" }}>
                  <Link to="/admin/orderslist" style={{ color: "white" }}>
                    <ArrowForwardIcon />
                  </Link>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col className="mx-auto mt-2">
          <Card
            style={{
              minWidth: "18rem",
              color: "white",
              background:
                "linear-gradient(45deg,rgb(50, 31, 219),rgb(31, 20, 152))",
            }}
          >
            <Card.Body>
              <Card.Title style={{ color: "white" }} as="h2">
                Orders Delivered
              </Card.Title>
              <Card.Text as="h4" style={{ color: "white" }}>
                {deliveredItemsCount}
              </Card.Text>
              <div style={{ textAlign: "right" }}>
                <Link to="/admin/orderslist" style={{ color: "white" }}>
                  <ArrowForwardIcon />
                </Link>
              </div>
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
            }}
          >
            <Card.Body>
              <Card.Title style={{ color: "white" }} as="h2">
                Pending delivery
              </Card.Title>
              <Card.Text as="h4" style={{ color: "white" }}>
                {pendingDeliveredItemsCount}
              </Card.Text>
              <div style={{ textAlign: "right" }}>
                <ArrowForwardIcon />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AdminHeader;
