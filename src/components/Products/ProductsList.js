import PropTypes from "prop-types";
import React from "react";
import ProductsItem from "./ProductsItem";

ProductsList.propTypes = {
  initProductList: PropTypes.array,
  onAddToCart: PropTypes.func,
};

function ProductsList({ initProductList, onAddToCart }) {
  // if(!onAddToCart) return;

  return (
    <div className="products-list">
      {initProductList ? (
        initProductList.map((productItem) => (
          <ProductsItem
            key={productItem.id}
            productItem={productItem}
            onAddToCart={onAddToCart}
          />
        ))
      ) : (
        <p>empty products</p>
      )}
    </div>
  );
}

export default ProductsList;
