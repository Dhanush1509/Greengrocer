import React, { useContext, useEffect } from "react";
import orderContext from "../context/order/orderContext";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import authContext from "../context/auth/AuthContext";
import {Link} from "react-router-dom"
const MyOrders = (props) => {
  const { getMyOrders, myorders } = useContext(orderContext);

  const { userData } = useContext(authContext);
  useEffect(() => {
    if (userData.length === 0) {
      props.history.push("/signin?redirect=myorders");
    } else {
      getMyOrders();
    }

    //eslint-disable-next-line
  }, []);
  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: 440,
    },
  });
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table
            stickyHeader
            aria-label="sticky table"
            style={{ color: "black" }}
          >
            <TableHead>
              <TableRow>
                <TableCell>ORDER ID</TableCell>
                <TableCell>PLACED ORDER ON</TableCell>
                <TableCell>PRICE</TableCell>
                <TableCell>PAID</TableCell>
                <TableCell>PAYMENT ID</TableCell>
                <TableCell>PAID ON</TableCell>
                <TableCell>DELIVERED</TableCell>
                <TableCell>DELIVERED ON</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myorders.length > 0 ? (
                myorders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order) => (
                    <TableRow
                      key={order._id}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                    >
                      <TableCell>
                        <Link to={`/order/${order._id}/`}>{order._id}</Link>
                      </TableCell>
                      <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                      <TableCell>{order.totalPrice}</TableCell>
                      <TableCell>
                        {order.isPaid ? (
                          <CheckIcon style={{ color: "green" }} />
                        ) : (
                          <ClearIcon style={{ color: "red" }} />
                        )}
                      </TableCell>
                      <TableCell>
                        {order.isPaid ? (
                          order.paymentResult.razorpayPaymentId
                        ) : (
                          <ClearIcon style={{ color: "red" }} />
                        )}
                      </TableCell>
                      <TableCell>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <ClearIcon style={{ color: "red" }} />
                        )}
                      </TableCell>
                      <TableCell>
                        {order.isDelivered ? (
                          <CheckIcon style={{ color: "green" }} />
                        ) : (
                          <ClearIcon style={{ color: "red" }} />
                        )}
                      </TableCell>
                      <TableCell>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <ClearIcon style={{ color: "red" }} />
                        )}
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 50, 100]}
          component="div"
          count={myorders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};
export default MyOrders;
