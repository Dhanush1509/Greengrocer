import React from 'react'
import Helmet from 'react-helmet'
const Title = (props) => {
    return (
      <Helmet>
        <title>{props.title}</title>
        <meta name="description" content={props.description}/>
        <meta name="keywords" content={props.keywords} />
        <meta name="author" content="Singamsetty Munidhanush" />
      </Helmet>
    );
}
Title.defaultProps = {
    title:"Greengrocer",
    description:"Get Organic Veggies and Fruits",
    keywords:"Greengrocer,Fruits,Vegetables,Organic"
}
export default Title
