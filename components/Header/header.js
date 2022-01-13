import { useState } from "react";
import Logo from "../UI/Logo/logo";
import styles from "../../styles/header.module.css";
import Search from "../UI/Search/search";
import Navitems from "./navitems/navitems";
import Dropdown from "../UI/DropDown/dropdown";
import CartIcon from "../UI/CartIcon/carticon";
import UserIcon from "../UI/UserIcon/usericon";
import Menu from "../UI/HamburgerMenu/hamburger";
import Link from "next/link";
import DropHeader from "./dropHeader/dropHeader";
import useCart from "../../util/useCart";

const header = () => {
  const [search, setSearch] = useState(false);
  const [open, setOpen] = useState(false);

  const { isCartOpened } = useCart();
  const onClickHandler = () => {
    setOpen(!open);
  };
  const searchHeandler = () => {
    setSearch(!search);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerbig}>
        <Logo />
        <Search />
        <Navitems />
        {/* <Dropdown/> */}
        <UserIcon />
        <CartIcon />
      </div>
      <div className={styles.responsive}>
        {search ? null : <Logo styles={styles.logos} />}
        {search ? null : (
          <Menu
            open={open}
            onclickhandler={isCartOpened ? null : onClickHandler}
          />
        )}
        {search ? (
          <Search
            styles={styles.responsivesearch}
            input={styles.responsiveinput}
          />
        ) : null}
        {open ? null : (
          <img
            onClick={open || isCartOpened ? null : searchHeandler}
            className={search ? styles.searchX : styles.searchicon}
            src={search ? "/header/x.svg" : "/header/search.svg"}
            alt=""
          />
        )}
        {search || open ? null : <CartIcon open={open} />}
        {open ? <DropHeader setopen={onClickHandler} /> : null}
        {open ? (
          <UserIcon click={onClickHandler} styles={styles.usericonn} />
        ) : null}
      </div>
    </header>
  );
};

export default header;
