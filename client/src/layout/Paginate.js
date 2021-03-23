import React,{useContext} from 'react'
import {Pagination} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import productContext from "../context/product/productContext"
const Paginate = (props) => {
    const {totalPages,page}=useContext(productContext)
    return (
      <>
        <Pagination className="mt-4 mx-auto">
          {[...Array(totalPages).keys()].map((x) => (
            <LinkContainer
              key={x + 1}
              to={props.keyword? `/query/${props.keyword}/page/${x + 1}`: `/page/${x + 1}`}>
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination>
      </>
    );
}

export default Paginate
