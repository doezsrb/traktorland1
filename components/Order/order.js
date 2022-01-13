import styles from "./order.module.css";
import CartItem from "../Cart/CartItems/CartItem/cartitem";
import Total from "../UI/Checkout/total";
import Input from "../UI/Input/input";
import Submit from "../UI/Button/Submit/submit";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useCart from "../../util/useCart";
import Link from "next/link";
const order = (props) => {
  const { items, user, price, price1, price2, price3, isLogged, resetItems } =
    useCart();
  if (props.adminpanel != undefined) {
    var [order, setOrder] = useState(props.orders);
    var [userinfo, setUserinfo] = useState(props.data);
  } else {
    var [order, setOrder] = useState(props.data);
    var [userinfo, setUserinfo] = useState(user);
  }

  const [orderaddress, setOrderaddress] = useState(props.orderaddress);
  const [fullPrice, setFullPrice] = useState(0);
  const [url, setUrl] = useState("");

  const [zavrsen, setZavrsen] = useState("Zavrsi");
  const router = useRouter();
  useEffect(() => {
    setUrl(router.asPath);
  }, []);
  // useEffect(()=>{

  //     setUrl(router.asPath)
  //     if(userinfo.zavrsen == 1){
  //         setZavrsen("Zavrsen")
  //     }
  //     var cena = 0;
  //     var fullcena = 0;
  //     order.map(item => {

  //         var popust;
  //                     var price2;
  //                     if(props.data.rabat == 1){
  //                         popust = item.rabat_1
  //                     }else if(props.data.rabat == 2){
  //                         popust = item.rabat_2
  //                     }else if(props.data.rabat == 3){
  //                         popust = item.rabat_3
  //                     }else{
  //                         popust = 0
  //                     }
  //                     price2 = (item.price) * (1 - popust/100)
  //         var newPrice = Number(price2) * Number(item.qty)
  //        cena = cena+newPrice
  //        fullcena = fullcena + (Number(item.price) * Number(item.qty))

  //     })
  //     setFullPrice(fullcena)
  //      setPrice(cena)

  // },[])
  function zavrsiOrder() {
    var HOST = process.env.NEXT_PUBLIC_HOST;
    var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
    if (zavrsen == "Zavrsi") {
      var formData = new FormData();
      formData.append("value", 1);
      formData.append("id", userinfo.documentid);
      fetch(PROTOCOL + "://" + HOST + "/api/finishorder", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result == "Success") setZavrsen("Zavrsen");
        });
    } else {
      var formData = new FormData();
      formData.append("value", 0);
      formData.append("id", userinfo.documentid);
      fetch(PROTOCOL + "://" + HOST + "/api/finishorder", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result == "Success") setZavrsen("Zavrsi");
        });
    }
  }
  function onSubmit() {
    var HOST = process.env.NEXT_PUBLIC_HOST;
    var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
    var formData_ = new FormData();

    var userrabat = 0;
    if (user.rabat != undefined) {
      userrabat = user.rabat;
    }

    formData_.append("items", JSON.stringify(props.data));
    formData_.append("postData", JSON.stringify(orderaddress));
    formData_.append("userrabat", userrabat);
    fetch(PROTOCOL + "://" + HOST + "/api/addorder", {
      method: "POST",
      body: formData_,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result == "Success") {
          alert("Uspesno");
          resetItems();
          router.push("/");
        }
      });
  }

  return (
    <>
      <div className={styles.row}>
        {props.data.created && props.data.time ? (
          <h3 className={styles.vreme}>
            {props.data.created + `  ` + props.data.time}
          </h3>
        ) : null}

        <div className={styles.CartItems}>
          {order.map((item) => {
            return (
              <CartItem
                key={item.productid}
                isLogged={props.namena == order ? true : isLogged}
                key={item.id}
                edit={props.edit}
                sifra={item.code != undefined ? item.code : item.sifra}
                namena={props.namena}
                src={item.slika}
                name={item.name != undefined ? item.name : item.ime}
                price={item.price}
                price1={item.price1}
                price2={item.price2}
                price3={item.price3}
                rabat={user.rabat}
                qty={item.qty}
                up={() => addOne(item)}
                down={() => removeOne(item)}
                brisi={() => removeFromCart(item)}
              ></CartItem>
            );
          })}
        </div>
        <div className={styles.total}>
          <Total
            isLogged={isLogged}
            edit={props.edit}
            price={price}
            price1={price1}
            price2={price2}
            price3={price3}
            rabat={user.rabat == undefined ? "0" : user.rabat}
          />
          <div className={styles.orderinfo}>
            {/* <Input inputtype="input" label="Napomena"/> */}
            <div className={styles.infoblock}>
              <Link href="/checkout/orderdetails">
                <img
                  className={styles.editShipping}
                  src="/admin/edit.png"
                  alt=""
                />
              </Link>
              <h3>Detalji narucioca</h3>
              <ul>
                {userinfo.ime_prezime == undefined ? (
                  <li>{orderaddress.name}</li>
                ) : (
                  <li>{userinfo.ime_prezime}</li>
                )}
                <li>{orderaddress.phone}</li>
                <li>{orderaddress.email}</li>

                {orderaddress.naziv_firme != null ? (
                  <>
                    <li>{orderaddress.naziv_firme}</li>
                  </>
                ) : null}
                {orderaddress.pib != null ? (
                  <>
                    <li>{orderaddress.pib}</li>
                  </>
                ) : null}
                {orderaddress.code != null ? (
                  <>
                    <li>{orderaddress.code}</li>
                  </>
                ) : null}
                <li>{orderaddress.address}</li>
                <li>
                  {orderaddress.city} {orderaddress.zip}{" "}
                </li>
              </ul>
              {url.includes("admin") ? (
                <span onClick={zavrsiOrder}>
                  <Submit styles={styles.dugme}>{zavrsen}</Submit>
                </span>
              ) : (
                <span onClick={onSubmit}>
                  <Submit styles={styles.dugme}>Pošalji porudžbinu</Submit>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div className={styles.row}>
                <div className={styles.line}></div>
                
                
            </div> */}
    </>
  );
};

export default order;
