import styles from "./search.module.css";
import SearchItems from "./SearchItems/searchitems.js";
import Link from "next/link";
import Wrapper from "../UI/Wrapper/wrapper";
import useCart from "../../util/useCart";
import { useEffect } from "react";
const search = ({ data, search }) => {
  const { toggleSearch, isSearchOpened } = useCart();
  useEffect(() => {
    if (data.length != 0 && !isSearchOpened) {
      toggleSearch(true);
    }
  }, [data.length]);

  return (
    <>
      {data.length != 0 ? (
        <Wrapper
          style={"106px"}
          isOpened={isSearchOpened}
          click={() => toggleSearch(false)}
        />
      ) : null}
      {data.length != 0 && isSearchOpened ? (
        <div className={styles.search}>
          {data.length > 10 ? (
            <div className={styles.more}>
              <Link href={`/search/${search}`}>
                <a>Klikni da pogledas jos {data.length - 10} proizvoda!</a>
              </Link>
            </div>
          ) : null}
          <SearchItems click={() => toggleSearch(false)} data={data} />
        </div>
      ) : null}
    </>
  );
};

export default search;
