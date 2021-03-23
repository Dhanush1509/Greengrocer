import React, { useContext,useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import authContext from "../../context/auth/AuthContext";
import AdminContext from "../../context/admin/AdminContext";
import AdminHeader from "./AdminHeader"
import Table from "./UsersTable"
const AdminPage = (props) => {
    const { userData } = useContext(authContext);
    const { getAllUsers, users,getAllOrdersForAdmin,deliveredItemsCount,pendingDeliveredItemsCount } = useContext(AdminContext);
    useEffect(() => {
      if(userData.length !== 0){
        if(userData.isAdmin===true){
getAllUsers(); 
  getAllOrdersForAdmin();

        }
        else{ 
props.history.push("/")
        }
      }
      else{
        props.history.push("/signin")
      }
        
//eslint-disable-next-line
    },[])
  return (
  <>
      <AdminHeader />
  
 </>
  );
};

export default AdminPage;
