import styles from "./proizvodi.module.css";
import Proizvod from "./Proizvod/proizvod";
import { useState, useEffect } from "react";
const proizvodi = (props) => {
  const [allPro, setAllPro] = useState(props.data);
  const [loading, setLoading] = useState();

  useEffect(() => {
    setAllPro(props.data);
  }, [props.data]);
  function refreshData() {
    var HOST = process.env.NEXT_PUBLIC_HOST;
    var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
    fetch(PROTOCOL + "://" + HOST + "/api/get")
      .then((res) => res.json())
      .then((data) => {
        setAllPro(data);
      });
  }

  return (
    <div className={styles.proizvodi}>
      {loading ? (
        <h3 style={{ textAlign: "center" }}>LOADING</h3>
      ) : (
        allPro.map((item) => (
          <Proizvod
            refresh={(e) => refreshData(e)}
            key={item["productid"]}
            id={item["productid"]}
            sifra={item["code"]}
            src={item["thumb"]}
            name={item["name"]}
            price={item["price"]}
            rabat_1={item["rabat_1"]}
            rabat_2={item["rabat_2"]}
            rabat_3={item["rabat_3"]}
            kolicina={item["qty"]}
            zemlja_porekla={item["zemlja_porekla"]}
            url={"/admin/proizvodi/edit?id=" + item["productid"]}
          ></Proizvod>
        ))
      )}
    </div>
  );
};

export default proizvodi;
