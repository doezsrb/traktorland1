import styles from "./Search.module.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Search from "../../Search/search";
import { useState, useEffect } from "react";
import useCart from "../../../util/useCart";

const search = (props) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [maskData, setMaskData] = useState([]);
  const { toggleSearch, isSearchOpened } = useCart();

  function onChange(e) {
    var HOST = process.env.NEXT_PUBLIC_HOST;
    var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
    setSearch(e.target.value);

    var offset = 0;
    var limit = 10;
    fetch(
      PROTOCOL +
        "://" +
        HOST +
        "/api/search?search=" +
        e.target.value +
        "&offset=" +
        offset +
        "&limit=" +
        limit
    )
      .then((res) => res.json())
      .then((data) => {
        setData([]);
        setData((current) => {
          return data.results;
        });
      });
  }
  let style = [styles.Search];

  const upaliSearch = () => {
    console.log(search, data.length, isSearchOpened);
    if (search != "" && data.length > 0 && !isSearchOpened) {
      toggleSearch(true);
    }
  };

  let inputstyle = [styles.input];
  {
    props.input ? inputstyle.push(props.input) : null;
  }
  {
    props.styles ? style.push(props.styles) : null;
  }
  return (
    <Aux>
      <div className={style.join(" ")}>
        <div className={styles.lupica}>
          <img src="/header/search.svg" alt="" />
        </div>
        <input
          onClick={upaliSearch}
          onChange={(e) => onChange(e)}
          value={search}
          className={inputstyle.join(" ")}
          type="text"
          placeholder="Pretrazite..."
        />
        {search != "" ? (
          <Search styles={props.input} search={search} data={data} />
        ) : null}
      </div>
    </Aux>
  );
};

export default search;
