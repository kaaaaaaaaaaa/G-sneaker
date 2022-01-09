import React from "react";
import PropTypes from "prop-types";
import ProductsList from "./ProductsList";
import "./style.scss";
import logo from "../../assets/nike.png";

Products.propTypes = {
  productList: PropTypes.array,
  onAddToCart: PropTypes.func,
};

function Products({ productList, onAddToCart }) {
  return (
    <div className="cart">
      <div className="cart__logo">
        <img src={logo} alt="cart" />
      </div>
      <div className="cart__top">
        <div className="cart__title">
          <h2>Our Products</h2>
        </div>
        <div className="cart__amount"></div>
      </div>
      <div className="cart__body">
        <ProductsList
          initProductList={productList}
          onAddToCart={onAddToCart}
        ></ProductsList>
      </div>
    </div>
  );
}

export default Products;
