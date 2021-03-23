import React,{Fragment} from 'react'

function SingleProductDescription(props) {
    return (
      <>
        <h6 className="mr-1" style={{fontFamily:"'Vollkorn',serif",color:"black",fontWeight:"300"}}>
          <li className="mr-1">{props.listItem}</li>{" "}
        </h6>
      </>
    );
}

export default SingleProductDescription
