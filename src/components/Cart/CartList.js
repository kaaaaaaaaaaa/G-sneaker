import PropTypes from "prop-types";
import React from "react";
import CartItem from "./CartItem";

CartList.propTypes = {
  cartProductsList: PropTypes.array,
  onAddToCart: PropTypes.func,
  onRemove: PropTypes.func,
  onDelete: PropTypes.func,
};

function CartList({ cartProductsList, onAddToCart, onRemove, onDelete }) {
  return (
    <div className="cart-list">
      {cartProductsList &&
        cartProductsList.map((cartItem) => (
          <CartItem
            key={cartItem.id}
            cartItem={cartItem}
            onAddToCart={onAddToCart}
            onRemoveFromCart={onRemove}
            onDelete={onDelete}
          />
        ))}
      {cartProductsList.length === 0 && <p> Your cart is empty </p>}
    </div>
  );
}

export default CartList;
