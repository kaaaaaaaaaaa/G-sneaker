import PropTypes from "prop-types";
import React, { useRef } from "react";
import removeIcon from "../../assets/trash.png";

CartItem.propTypes = {
  cartItem: PropTypes.object,
};

function CartItem(props) {
  const { cartItem, onAddToCart, onRemoveFromCart, onDelete } = props;
  const cartItemRef = useRef();

  function handleDeleteProduct(cartItem) {
    // let removed = false;
    if (onDelete) {
      cartItemRef.current.style.animation =
        "myAniRemove cubic-bezier(0.175, 0.885, 0.32, 1) 0.9s forwards";
      // cartItemRef.current.style.animationFillMode = "forwards";
      // console.log(cartItemRef.current.style);
      // onDelete(cartItem);

      setTimeout(() => {
        onDelete(cartItem);
      }, 600);
    }
  }
  function handleRemoveProduct(cartItem) {
    // let removed = false;
    if (onRemoveFromCart && cartItem.qty === 1) {
      cartItemRef.current.style.animation =
        "myAniRemove cubic-bezier(0.175, 0.885, 0.32, 1) 0.9s forwards";

      setTimeout(() => {
        onRemoveFromCart(cartItem);
      }, 600);
    } else {
      onRemoveFromCart(cartItem);
    }
  }
  return (
    <>
      {cartItem.qty > 0 && (
        <div className="cart-item" ref={cartItemRef} key={cartItem.id}>
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
                  onClick={() => handleRemoveProduct(cartItem)}
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
                onClick={() => handleDeleteProduct(cartItem)}
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
