import React, { useContext, useEffect } from "react";
import AdminContext from "../../context/admin/AdminContext";

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
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import moment from "moment";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../../layout/Spinner";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {  makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
  container: {
    height: 500,
  },
});

const Products = (props) => {
  const {
    orderListLoading,
    getAllProductsForAdmin,
    productsForAdmin,deleteProductByAdmin,success
  } = useContext(AdminContext);
  const { userData } = useContext(authContext);
  useEffect(() => {
    getAllProductsForAdmin();
    //eslint-disable-next-line
  }, [success]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
const handleDelete=(id)=>{
deleteProductByAdmin(id)
}
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
      <div style={{ textAlign: "left" }}>
        <Button
          className="my-4"
          onClick={() => props.history.push("/admin/product/create")}
        >
          CREATE PRODUCT
          <AddIcon />
        </Button>
      </div>

      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <>
                <TableCell>Product Id</TableCell>
                <TableCell>name</TableCell>
                <TableCell>price</TableCell>
                <TableCell>category</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsForAdmin.length > 0 ? (
              productsForAdmin
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={order._id}>
                    <TableCell>
                      {" "}
                      <Link to={`/products/${order._id}`}>{order._id}</Link>
                    </TableCell>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.price}</TableCell>
                    <TableCell>{order.category}</TableCell>
                    <TableCell>
                      <EditIcon
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() =>
                          props.history.push(`/admin/product/${order._id}/edit`)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <DeleteIcon
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => handleDelete(order._id)}
                      />
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
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={productsForAdmin.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default Products;
