import PropTypes from "prop-types";
import React from "react";
import removeIcon from "../../assets/trash.png";

CartItem.propTypes = {
  cartItem: PropTypes.object,
};

function CartItem(props) {
  const { cartItem, onAddToCart, onRemoveFromCart, onDelete } = props;
  return (
    <>
      {cartItem.qty > 0 && (
        <div className="cart-item" key={cartItem.id}>
          <div className="cart-item__left">
            <div
              className="cart-item__block"
              style={{ background: cartItem.color }}
            >
              <div className="cart-item__img">
                <img src={cartItem.image} alt="" />
              </div>
            </div>
          </div>
          <div className="cart-item__right">
            <p className="cart-item__name">{cartItem.name}</p>
            <p className="cart-item__price">$ {cartItem.price}</p>
            <div className="cart-item__actions">
              <div className="cart-item__actions__count">
                <button
                  className="btn-count-decrease"
                  onClick={() => onRemoveFromCart(cartItem)}
                >
                  -
                </button>
                <span>{cartItem.qty}</span>
                <button
                  className="btn-count-increase"
                  onClick={() => onAddToCart(cartItem)}
                >
                  +
                </button>
              </div>
              <div
                className="cart-item__actions__remove"
                onClick={() => onDelete(cartItem)}
              >
                <img src={removeIcon} alt="" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CartItem;
