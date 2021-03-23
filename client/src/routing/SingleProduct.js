import React, { Fragment, useState, useEffect, useContext } from "react";
import { Row, Col, Container, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import SingleProductDescription from "../components/SingleProductDescription";
import productContext from "../context/product/productContext";
import alertContext from "../context/alert/AlertContext";
import cartContext from "../context/cart/cartContext";
import Helmet from "../components/Title";
import Loader from "../layout/Spinner"
function Product(props, history) {
  const ProductContext = useContext(productContext);
  const {
    getProduct,
    product,
    loading,
    error,
    getProductReset,
  } = ProductContext;
  const CartContext = useContext(cartContext);
  const { addToCart, cartItems } = CartContext;
  const AlertContext = useContext(alertContext);
  const { setAlert } = AlertContext;
  const [local, setLocal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getProduct(props.match.params.id);

    getProductReset();
    //eslint-disable-next-line
  }, [props.match.params.id]);
  // useEffect(() => {
  // localStorage.setItem("cartItem", JSON.stringify(cartItems));
  // }, [cartItems])
  useEffect(() => {
    if (error === "Product not found") {
      setAlert(error, "white", "red");
    }

    //eslint-disable-next-line
  }, [error]);
  // useEffect(() => {
  //   if (localStorage.getItem(props.match.params.id)) {
  //     setLocal(true);
  //   }
  //eslint-disable-next-line
  // }, []);
  useEffect(() => {
    if (localStorage.getItem("cartItems")) {
      const Items = JSON.parse(localStorage.getItem("cartItems"));
      Items.map((i) =>
        i.id === props.match.params.id ? setLocal(true) : null
      );
    }
    //eslint-disable-next-line
  }, [cartItems]);
  const handleCart = () => {
    let Item;
    if (JSON.parse(localStorage.getItem("cartItems"))) {
      Item = JSON.parse(localStorage.getItem("cartItems")).find(
        (x) => x.id === props.match.params.id
      );
    }

    if (Item) {
      props.history.push("/cart");
    } else {
      addToCart(props.match.params.id, true);

      setLocal(true);
    }
  };
  const substrings = (product?.description || "").split(".");
  return product && !loading ? (
    <div className="m-auto">
      <Helmet title={product.name} />
      <div className="maindiv" style={{ textAlign: "left" }}>
        {" "}
        <div className="newcard">
          <img src={product.image} className="card__image" alt="brown couch" />
          <div className="card__content">
            <span className="card__title">{product.name}</span>
            <div className="product__info">
              <div className="product__title">
                <span>{product._id}</span>
              </div>
              <div className="price">
                ₹<span>{product.price}</span>/kg
              </div>
              <div className="description">
                <h3 style={{ color: "black" }}>
                  <strong>BENEFITS</strong>
                </h3>
                <ul style={{ paddingLeft: 0, color: "black" }}>
                  {substrings.map((item, index) => (
                    <SingleProductDescription key={index} listItem={item} />
                  ))}
                </ul>
              </div>
              <button
                className="buy--btn"
                style={{
                  color: product.countInStock > 0 ? null : "white",
                  backgroundColor: product.countInStock > 0 ? null : "black",
                }}
                disabled={product.countInStock === 0}
                onClick={handleCart}
              >
                {product.countInStock > 0
                  ? local
                    ? "GO TO CART"
                    : "ADD TO CART"
                  : "OUT OF STOCK"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader/>
  )
}

export default Product;
