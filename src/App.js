import { useEffect, useRef, useState } from "react";
import "./App.scss";
import Cart from "./components/Cart";
import Products from "./components/Products";
import myData from "./data/shoes.json";

function App() {
  const getLocalProduct = () => {
    const localProduct = localStorage.getItem("products");
    if (localProduct) {
      return JSON.parse(localProduct);
    } else {
      return [];
    }
  };
  const getTotalPrice = () => {
    const total = localStorage.getItem("total");
    if (total) {
      return JSON.parse(total);
    } else {
      return 0;
    }
  };
  const initProductList = myData.shoes;

  const [productList, setProductList] = useState(initProductList);
  const [cartList, setCartList] = useState(getLocalProduct());
  const [total, setTotal] = useState(getTotalPrice());

  //hanle click add product to cart
  const handleAddToCart = (item) => {
    console.log("click", item);
    const index = productList.findIndex((product) => product.id === item.id);

    const newProductList = [...productList];

    // console.log(newProductList);
    newProductList[index] = {
      ...newProductList[index],
      qty: newProductList[index].qty + 1,
      isAdded: true,
    };
    setProductList(newProductList);

    console.log("add product:", newProductList[index].name);
    const duplicateIndex = cartList.findIndex(
      (item) => item.id === newProductList[index].id
    );

    if (duplicateIndex >= 0) {
      console.log("vi tri trong gio hang bị trùng:", duplicateIndex);
      const filter = [...cartList];

      filter[duplicateIndex] = {
        ...cartList[duplicateIndex],
        qty: cartList[duplicateIndex].qty + 1,
      };

      // console.log(filter);
      setCartList(filter);
      localStorage.setItem("products", JSON.stringify(filter));
    } else {
      const newFilter = [...cartList, newProductList[index]];
      setCartList(newFilter);
      localStorage.setItem("products", JSON.stringify(newFilter));
    }
  };

  //handel remove item
  const handleRemoveProduct = (item) => {
    console.log("remove");
    const index = productList.findIndex((product) => product.id === item.id);

    const newProductList = [...productList];
    newProductList[index] = {
      ...newProductList[index],
      qty: newProductList[index].qty > 0 && newProductList[index].qty - 1,
    };
    setProductList(newProductList);

    // find index duplicate product in cart
    const duplicateIndex = cartList.findIndex(
      (item) => item.id === newProductList[index].id
    );

    if (duplicateIndex >= 0) {
      const filter = [...cartList];

      filter[duplicateIndex] = {
        ...cartList[duplicateIndex],
        qty: cartList[duplicateIndex].qty - 1,
      };
      // setCartList(filter);
      if (item.qty === 1) {
        const filterProduct = filter.filter(
          (product) => product.id !== item.id
        );
        setCartList(filterProduct);
      } else {
        setCartList(filter);
      }

      // caculate total price
      const mountProductList = filter.reduce(
        (a, v) => (a = a + v.price * v.qty),
        0
      );
      setTotal(mountProductList);

      localStorage.setItem("products", JSON.stringify(filter));
    }

    !cartList.length === 0 && localStorage.removeItem("products");
  };
  //
  const handleDeleteProduct = (item) => {
    console.log("delete: ", item.name);
    const index = productList.findIndex((product) => product.id === item.id);

    const newProductList = [...productList];
    newProductList[index] = {
      ...newProductList[index],
      qty: 0,
    };
    setProductList(newProductList);

    const newCartList = cartList.filter((cart) => cart.id !== item.id);

    setCartList(newCartList);
    localStorage.setItem("products", JSON.stringify(newCartList));
  };
  //
  useEffect(() => {
    console.log("render lần đầu");
    const cartArrID = cartList.map((product) => product.id);

    // filter product which id !== item id in cart list
    const newProductList = productList.filter(
      (product) => cartArrID.indexOf(product.id) === -1
    );

    let newArr = [...newProductList, ...cartList];
    // sort arr
    newArr.sort((a, b) => a.id - b.id);
    // console.log(newArr);
    setProductList(newArr);

    const mountProductList = cartList.reduce(
      (a, v) => (a = a + v.price * v.qty),
      0
    );

    setTotal(mountProductList);

    cartList.length === 0 && localStorage.removeItem("products");
  }, [cartList, total]);

  return (
    <div className="App">
      <Products
        productList={productList}
        onAddToCart={handleAddToCart}
        cartList={cartList}
      />
      <Cart
        cartProductsList={cartList}
        onAddToCart={handleAddToCart}
        onDeleteProduct={handleDeleteProduct}
        onRemove={handleRemoveProduct}
        mount={total}
      />
    </div>
  );
}

export default App;
