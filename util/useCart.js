import { useSelector, useDispatch } from "react-redux";

const useCart = () => {
  const isItemOpened = useSelector((state) => state.isItemOpened);
  const isCartOpened = useSelector((state) => state.isCartOpened);
  const isSearchOpened = useSelector((state) => state.isSearchOpened);
  const items = useSelector((state) => state.items);
  const rabat = useSelector((state) => state.items);
  const price = useSelector((state) => state.price);
  const price1 = useSelector((state) => state.price1);
  const price2 = useSelector((state) => state.price2);
  const price3 = useSelector((state) => state.price3);
  const user = useSelector((state) => state.user);
  const shipping = useSelector((state) => state.shipping);
  const dispatch = useDispatch();
  let isLogged = useSelector((state) => state.isLogged);

  const toggleCart = () => {
    dispatch({
      type: "TOGGLE_CART",
    });
  };
  const toggleItem = () => {
    dispatch({
      type: "TOGGLE_ITEM",
    });
  };
  const toggleSearch = (set) => {
    dispatch({
      type: "TOGGLE_SEARCH",
      payload: set,
    });
  };
  const setUser = (user) => {
    dispatch({
      type: "SET_USER",
      payload: user,
    });
  };
  const toggleLogged = (user) => {
    dispatch({
      type: "TOGGLE_LOGGED",
      payload: user,
    });
  };
  const undItem = () => {
    dispatch({
      type: "UND_ITEM",
    });
  };
  const addToCart = (item) =>
    dispatch({
      type: "ADD",
      payload: item,
    });

  const removeFromCart = (item) =>
    dispatch({
      type: "REMOVE",
      payload: item,
    });
  const resetItems = () =>
    dispatch({
      type: "RESET_ITEMS",
    });
  const addOne = (item) =>
    dispatch({
      type: "ADD_ONE",
      payload: item,
    });
  const removeOne = (item) =>
    dispatch({
      type: "REMOVE_ONE",
      payload: item,
    });
  const setShipping = (shipping) => {
    dispatch({
      type: "SET_SHIPPING",
      payload: shipping,
    });
  };

  const emptyCart = () => {
    dispatch({ type: "EMPTY_CART" });
  };

  return {
    items,
    rabat,
    price,
    price1,
    price2,
    price3,
    user,
    isCartOpened,
    isItemOpened,
    isSearchOpened,
    isLogged,
    shipping,
    setUser,
    resetItems,
    setShipping,
    toggleCart,
    toggleItem,
    toggleSearch,
    toggleLogged,
    undItem,
    addToCart,
    addOne,
    removeOne,
    emptyCart,
    removeFromCart,
  };
};

export default useCart;
