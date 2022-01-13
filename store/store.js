import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { loadState } from "./localStorage";
let store;

const persistedState = loadState();

const initialState = persistedState || {
  isCartOpened: false,
  items: [],
  price: 0,
  price1: 0,
  price2: 0,
  price3: 0,
  user: {},
  shipping: {},
  isLogged: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "EMPTY_CART":
      return {
        ...state,
        price: 0,
        items: [],
      };
    case "TOGGLE_CART":
      return {
        ...state,
        isCartOpened: !state.isCartOpened,
      };

    case "TOGGLE_SEARCH":
      return {
        ...state,
        isSearchOpened: payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: { ...payload },
      };
    case "UND_ITEM":
      return {
        ...state,
        isItemOpened: undefined,
      };
    case "TOGGLE_ITEM":
      return {
        ...state,
        isItemOpened: !state.isItemOpened,
      };
    case "TOGGLE_LOGGED":
      return {
        ...state,
        isLogged: payload,
      };
    case "ADD":
      let plusitem = state.items.filter((item) => item.id == payload.id);
      let newItems = [...state.items];
      moze = 0;
      let mnozi = 1;
      if (plusitem.length > 0) {
        newItems.forEach((item) => {
          if (item.id == payload.id) {
            if (item.qty + payload.qty <= item.kolicina) {
              item.qty += payload.qty;
              moze = 1;
            } else {
              moze = 2;
              mnozi = item.kolicina - item.qty;
              item.qty = item.kolicina;
            }
          }
        });
        if (moze == 1) {
          return {
            ...state,
            price: state.price + payload.price * payload.qty,
            price1: state.price1 + payload.price1 * payload.qty,
            price2: state.price2 + payload.price2 * payload.qty,
            price3: state.price3 + payload.price3 * payload.qty,
            isCartOpened: true,
            items: newItems,
          };
        } else if (moze == 2) {
          return {
            ...state,
            price: state.price + payload.price * mnozi,
            price1: state.price1 + payload.price1 * mnozi,
            price2: state.price2 + payload.price2 * mnozi,
            price3: state.price3 + payload.price3 * mnozi,
            isCartOpened: true,
            items: newItems,
          };
        }
      } else {
        return {
          ...state,
          price: state.price + payload.price * payload.qty,
          price1: state.price1 + payload.price1 * payload.qty,
          price2: state.price2 + payload.price2 * payload.qty,
          price3: state.price3 + payload.price3 * payload.qty,
          isCartOpened: true,
          items: [...state.items, payload],
        };
      }
    case "ADD_ONE":
      newItems = [...state.items];
      let moze = 0;
      newItems.forEach((item) => {
        if (item.id == payload.id) {
          if (item.qty + 1 <= item.kolicina) {
            item.qty++;
            moze = 1;
          } else {
            item.qty = item.kolicina;
            moze = 2;
          }
        }
      });
      if (moze == 1) {
        return {
          ...state,
          price: Number(state.price) + Number(payload.price),
          price1: Number(state.price1) + Number(payload.price1),
          price2: Number(state.price2) + Number(payload.price2),
          price3: Number(state.price3) + Number(payload.price3),
          items: newItems,
        };
      } else {
        return state;
      }

    case "REMOVE_ONE":
      newItems = [...state.items];
      let newPrice = state.price;
      let nprice1 = state.price1;
      let nprice2 = state.price2;
      let nprice3 = state.price3;
      newItems.forEach((item) => {
        if (item.id == payload.id) {
          if (item.qty > 1) {
            item.qty--;
            newPrice -= payload.price;
            nprice1 -= payload.price1;
            nprice2 -= payload.price2;
            nprice3 -= payload.price3;
          }
        }
      });
      return {
        ...state,
        price: newPrice,
        price1: nprice1,
        price2: nprice2,
        price3: nprice3,
        items: newItems,
      };
    case "REMOVE":
      return {
        ...state,
        price: state.price - payload.price * payload.qty,
        price1: state.price1 - payload.price1 * payload.qty,
        price2: state.price2 - payload.price2 * payload.qty,
        price3: state.price3 - payload.price3 * payload.qty,
        items: state.items.filter((item) => item.id !== payload.id),
      };
    case "RESET_ITEMS":
      return {
        ...state,
        price: 0,
        price1: 0,
        price2: 0,
        price3: 0,
        items: [],
      };
    case "SET_SHIPPING":
      return {
        ...state,
        shipping: { ...payload },
      };
    default:
      return state;
  }
};

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);
  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
