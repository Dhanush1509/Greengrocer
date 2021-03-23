{
  /* <Row className="maindiv">
        <Row className="newcard">
          <Col>
            {" "}
            <img
              src="https://cdn.pixabay.com/photo/2015/08/16/12/03/sandwich-890823_1280.jpg"
              className="card__image"
              alt="brown couch"
            />
          </Col>
          <Col className="card__content" style={{ textAlign: "left" }}>
            <span className="card__title">{product.name}</span>
            <div className="product__info">
              <div className="product__title">
                <span>COD: 45999</span>
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
          </Col>
        </Row>
      </Row> */
}
