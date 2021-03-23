import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "react-bootstrap";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import authContext from "../../context/auth/AuthContext";
import AdminContext from "../../context/admin/AdminContext";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import moment from "moment";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../../layout/Spinner";
const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
  container: {
    height: 600,
  },
});
const Order = (props) => {
  const {
    getAllOrdersForAdmin,
    adminOrders,
    updateOrderToDelivered,
    adminOrder,
    orderListLoading,
  } = useContext(AdminContext);
  const { userData } = useContext(authContext);
  useEffect(() => {
    getAllOrdersForAdmin();
    //eslint-disable-next-line
  }, [adminOrder]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  console.log(adminOrders);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClick = (id) => {
    updateOrderToDelivered(id);
    props.history.push("/admin/orderslist");
  };
  const classes = useStyles();
  useEffect(() => {
    if (userData) {
      if (userData.isAdmin === false) {
        props.history.push("/");
      }
    }
    if (userData.length === 0) {
      props.history.push("/");
    }
    //eslint-disable-next-line
  }, []);
  return orderListLoading ? (
    <>
      <Loader />
    </>
  ) : (
    <>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <>
                <TableCell align="right">order Id</TableCell>
                <TableCell style={{ minWidth: 300 }} align="right">
                  order createdAt
                </TableCell>
                <TableCell align="right">isPaid</TableCell>
                <TableCell align="right">isDelivered</TableCell>
                <TableCell align="right" style={{ minWidth: 200 }}>
                  update as delivered
                </TableCell>
                <TableCell style={{ minWidth: 300 }} align="right">
                  order UpdatedAt
                </TableCell>
                <TableCell style={{ minWidth: 400 }} align="right">
                  Delivery Address
                </TableCell>
                <TableCell align="right">paymentOption</TableCell>
                <TableCell align="right">deliveryPrice</TableCell>
                <TableCell align="right">taxPrice</TableCell>
                <TableCell align="right">itemsPrice</TableCell>
                <TableCell align="right">totalPrice</TableCell>
              </>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminOrders.length > 0 ? (
              adminOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={order._id}>
                    <TableCell align="right">
                      {" "}
                      <Link to={`/order/${order._id}`}>{order._id}</Link>
                    </TableCell>
                    <TableCell style={{ minWidth: 300 }} align="right">
                      {moment(order.createdAt).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {order.isPaid ? (
                        <CheckIcon style={{ color: "green" }} />
                      ) : (
                        <ClearIcon style={{ color: "red" }} />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {order.isDelivered ? (
                        <CheckIcon style={{ color: "green" }} />
                      ) : (
                        <ClearIcon style={{ color: "red" }} />
                      )}
                    </TableCell>{" "}
                    <TableCell align="right">
                      {order.isDelivered ? (
                        <Button disabled>Delivered</Button>
                      ) : (
                        <Button
                          onClick={() => {
                            handleClick(order._id);
                          }}
                        >
                          Mark as delivered
                        </Button>
                      )}
                    </TableCell>
                    <TableCell style={{ minWidth: 300 }} align="right">
                      {moment(order.updatedAt).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </TableCell>
                    <TableCell style={{ minWidth: 400 }} align="right">
                      {order.deliveryAddress.address},
                      {order.deliveryAddress.city},
                      {order.deliveryAddress.country},
                      {order.deliveryAddress.postalCode}
                    </TableCell>
                    <TableCell align="right">{order.paymentOption}</TableCell>
                    <TableCell align="right">{order.deliveryPrice}</TableCell>
                    <TableCell align="right">{order.taxPrice}</TableCell>
                    <TableCell align="right">{order.itemsPrice}</TableCell>
                    <TableCell align="right">{order.totalPrice}</TableCell>
                  </TableRow>
                ))
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={adminOrders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default Order;
