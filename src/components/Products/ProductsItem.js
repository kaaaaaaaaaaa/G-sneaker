import PropTypes from "prop-types";
import React from "react";
import CheckedIcon from "../../assets/check.png";

ProductsItem.propTypes = {
  productItem: PropTypes.object,
  onAddToCart: PropTypes.func,
};
const iconChecked = `<img src=${CheckedIcon} alt="Added"/>`;
const btnToCart = `<button>ADD TO CART</button>`;

function ProductsItem(props) {
  const { productItem, onAddToCart } = props;
  if (!onAddToCart) return;

  function handleAddToCart(item) {
    onAddToCart(item);
  }

  const conditionChecked = productItem.isAdded === true && productItem.qty > 0;
  return (
    <div className="product-item">
      <div
        className="product-item__img"
        style={{ background: productItem.color }}
      >
        <img src={productItem.image} alt="" />
      </div>
      <p className="product-item__name"> {productItem.name} </p>
      <p className="product-item__description"> {productItem.description} </p>
      <div className="product-item__bottom">
        <div className="price"> $ {productItem.price} </div>
        <div className="product-item__cover">
          {productItem.qty === 0 && (
            <div
              onClick={() => handleAddToCart(productItem)}
              className=""
              dangerouslySetInnerHTML={{ __html: btnToCart }}
            />
          )}
          {conditionChecked && (
            <div
              className="icon-checked"
              dangerouslySetInnerHTML={{ __html: iconChecked }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsItem;
