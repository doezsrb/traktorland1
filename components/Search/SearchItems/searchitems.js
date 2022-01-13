import { useEffect } from "react";
import styles from "./searchitems.module.css";
import SearchItem from "./SearchItem/searchItem";
import Link from "next/link";
const searchItems = ({ data, click }) => {
  return (
    <div className={styles.search}>
      {data.map((item) => (
        <Link
          key={item.productid}
          href={`/webshop/${
            item.categoryparentname == null
              ? item.categoryname.toLowerCase()
              : item.categoryparentname.toLowerCase()
          }/${item.productid}/?page=1`}
        >
          <a>
            {" "}
            <SearchItem
              click={click}
              img={item.thumb}
              ime={item.name}
              cena={item.price}
            />{" "}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default searchItems;
