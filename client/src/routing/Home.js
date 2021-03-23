import React, { Fragment, useContext, useEffect, useState } from "react";
import productContext from "../context/product/productContext";
import authContext from "../context/auth/AuthContext";
import Lottie from "react-lottie";
import { Carousel, Container, Spinner, Row } from "react-bootstrap";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";
import image5 from "../assets/images/image5.jpg";
import ReactTypingEffect from "react-typing-effect";
import CardItem from "../components/CardItem";
import AuthContext from "../context/auth/AuthContext";
import alertContext from "../context/alert/AlertContext";
import animationData2 from "../assets/reactLottie/noresult.json";
import Paginate from "../layout/Paginate"
import Helmet from "../components/Title"
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData2,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const HomeText = () => {
  const margin = window.innerWidth > 720 ? "mb-4" : "m-1";
  return (
    <>
      <h1
        className={margin}
        style={{ fontSize: "4vw", display: "inline-block" }}
      >
        Welcome to&nbsp;
      </h1>
      <ReactTypingEffect
        speed="500"
        eraseDelay="10000"
        text={["Greengrocer"]}
        cursorRenderer={(cursor) => (
          <h1 style={{ fontSize: "4vw" }}>{cursor}</h1>
        )}
        displayTextRenderer={(text, i) => {
          return (
            <>
              <h1
                className={margin}
                style={{ fontSize: "4vw", display: "inline-block" }}
              >
                {text.split("").map((char, i) => {
                  const key = `${i}`;
                  return (
                    <span
                      key={key}
                      style={i === 0 || i === 5 ? { color: "#56cc9d" } : {}}
                    >
                      {char}
                    </span>
                  );
                })}
              </h1>
            </>
          );
        }}
      />
    </>
  );
};

const HomeCarousel = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={image3} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={image5} alt="First slide" />
        </Carousel.Item>{" "}
        <Carousel.Item>
          <img className="d-block w-100" src={image2} alt="First slide" />
        </Carousel.Item>
      </Carousel>
    </>
  );
};

const ProductsList = () => {
  const ProductContext = useContext(productContext);
  const { products } = ProductContext;
  return (
    <Container className="px-4 pt-4">
      <Row className="justify-content-md-left mt-5">
        {products.map((product) => (
          <CardItem
            key={product._id}
            _id={product._id}
            image={product.image}
            name={product.name}
            price={product.price}
            favouriteItem={product.favouriteItem}
          />
        ))}
      </Row>
    </Container>
  );
};

const SpinnerLocal = () => {
  return (
    <Spinner
      role="status"
      animation="border"
      style={{ color: "#56cc9d",height:"10vw",width:"10vw",marginTop:"30vh" }}
    />
  );
};

const Home = ({ history, match }) => {
  const { getUser } = useContext(authContext);
  // const [renderApp, setRenderApp] = useState(false);
  const ProductContext = useContext(productContext);
  const { getProducts, error, clearProductErrors,loading,products } = ProductContext;
  const AlertContext = useContext(alertContext);
  const { setAlert } = AlertContext;
  const keyword = match.params.keyword || "";
  const currentPageNumber = match.params.pagenumber || "";
  useEffect(() => {
   
    getProducts(keyword, currentPageNumber);
    window.scrollTo(0,0)
    //eslint-disable-next-line
  }, [history,keyword,currentPageNumber]);
  // console.log(match.params.keyword);
  useEffect(() => {
    if (error === "Products not found") {
      setAlert(error, "white", "red");
      clearProductErrors();
    }
    //eslint-disable-next-line
  }, [error]);
  useEffect(() => {
    getUser();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {keyword ? (
        <></>
      ) : (
        <>
        <Helmet/>
          <HomeText /> <HomeCarousel />
        </>
      )}
      <>
        {loading ? (
          <SpinnerLocal />
        ) : (
          <>
            <ProductsList /> <Paginate keyword={keyword} />
          </>
        )}
      </>
    </>
  );
};

export default Home;
