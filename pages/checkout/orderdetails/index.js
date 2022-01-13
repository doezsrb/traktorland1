import styles from "../../../styles/login.module.css";
import Form from "../../../components/Form/form";
import Input from "../../../components/UI/Input/input";
import Submit from "../../../components/UI/Button/Submit/submit";
import Cookies from "cookies";
import useCart from "../../../util/useCart";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";

// export async function getServerSideProps({req,res}){
//     var HOST = process.env.HOST;
//     var PROTOCOL = process.env.PROTOCOL
//     var user = ""
//     var email = ""
//     var cookies = new Cookies(req,res)
//     var authToken = cookies.get('auth-token')
//     if(authToken != undefined){
//         await fetch(PROTOCOL+'://'+HOST+'/api/checkauth',{headers:{'auth-token':authToken}})
//         .then(res => res.json()).then(data => {
//             email = data.email
//         })

//         await fetch(PROTOCOL+'://'+HOST+'/api/getuser',{
//             method:'POST',
//             body:JSON.stringify({email:email})
//         }).then(res => res.json()).then(data => {
//             user = data.user
//         })
//     }else{
//         user = {
//         ime:"",

//         telefon:"",
//         email:"",
//         adresa:"",
//         grad:"",
//         postanski_broj:""
//     }
//     }

//     return{
//         props:{
//             user:user
//         }
//     }
// }
function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
}
export default function Kontakt(props) {
  const [orderdata, setOrderdata] = useState({});
  const [inputEmpty, setInputEmpty] = useState({
    name: false,
    phone: false,
    email: false,
    address: false,
    city: false,
    zip: false,
  });

  const router = useRouter();
  const { price, items, isLogged, user, setShipping, shipping } = useCart();
  var [user_, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });
  useEffect(() => {
    if (isEmpty(user) && JSON.stringify(shipping) == "{}") {
    } else {
      setUser(JSON.stringify(shipping) != "{}" ? shipping : user);
    }
  }, [shipping]);

  const submitRef = useRef(null);

  useEffect(() => {
    var newOrderdata = { ...orderdata };
    newOrderdata.items = items;
    setOrderdata(newOrderdata);
  }, [items]);

  function onChange(e) {
    var newUser = { ...user_ };
    newUser[e.target.name] = e.target.value;
    setUser(newUser);

    var newOrderdata = { ...orderdata };
    newOrderdata.user = newUser;
    setOrderdata(newOrderdata);
  }
  function submitMask(e) {
    var newInput = { ...inputEmpty };
    var err = 0;
    // delete user_["pravno_lice"]

    for (var key in user_) {
      if (user_[key] === "") {
        newInput[key] = true;

        err++;
      }
    }

    setInputEmpty(newInput);
    if (err == 0) {
      setShipping(user_);
      router.push("/checkout/order");
    }
  }
  function onFocus(e) {
    var newInput = { ...inputEmpty };
    newInput[e.target.name] = false;
    setInputEmpty(newInput);
  }
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <Form formname="Detalji Narudžbine">
          <Input
            onFocus={(e) => onFocus(e)}
            style={inputEmpty.name ? { borderBottom: "1px solid red" } : {}}
            onChange={(e) => onChange(e)}
            inputtype="input"
            label="Ime"
            placeholder="npr. Petar"
            value={user_.name}
            name="name"
            type="text"
          ></Input>
          {user_.pravno_lice == 1 ? (
            <>
              <Input
                onFocus={(e) => onFocus(e)}
                style={
                  inputEmpty.naziv_firme
                    ? { borderBottom: "1px solid red" }
                    : {}
                }
                onChange={(e) => onChange(e)}
                inputtype="input"
                label="Naziv firme"
                placeholder="npr. Petar D.O.O"
                value={user_.naziv_firme}
                name="naziv_firme"
                type="text"
              ></Input>
              <Input
                onFocus={(e) => onFocus(e)}
                style={
                  inputEmpty.naziv_firme
                    ? { borderBottom: "1px solid red" }
                    : {}
                }
                onChange={(e) => onChange(e)}
                inputtype="input"
                label="PIB"
                placeholder="npr. 123456"
                value={user_.code}
                name="code"
                type="text"
              ></Input>
            </>
          ) : null}
          <Input
            onFocus={(e) => onFocus(e)}
            style={inputEmpty.phone ? { borderBottom: "1px solid red" } : {}}
            onChange={(e) => onChange(e)}
            inputtype="input"
            label="Telefon"
            placeholder="npr. 060/123/45-67"
            name="phone"
            value={user_.phone}
            type="text"
          ></Input>
          <Input
            onFocus={(e) => onFocus(e)}
            style={inputEmpty.email ? { borderBottom: "1px solid red" } : {}}
            onChange={(e) => onChange(e)}
            inputtype="input"
            label="E-mail"
            placeholder="npr. vasaadresa@gmail.com"
            name="email"
            value={user_.email}
            type="email"
          ></Input>
          <div className={styles.line}></div>
          <Input
            onFocus={(e) => onFocus(e)}
            style={inputEmpty.address ? { borderBottom: "1px solid red" } : {}}
            onChange={(e) => onChange(e)}
            inputtype="input"
            label="Adresa"
            placeholder="npr. Cara Dušana 26"
            value={user_.address}
            name="address"
            type="text"
          ></Input>
          <Input
            onFocus={(e) => onFocus(e)}
            style={inputEmpty.city ? { borderBottom: "1px solid red" } : {}}
            onChange={(e) => onChange(e)}
            inputtype="input"
            label="Grad"
            placeholder="npr. Beograd"
            name="city"
            value={user_.city}
            type="text"
          ></Input>
          <Input
            onFocus={(e) => onFocus(e)}
            style={inputEmpty.zip ? { borderBottom: "1px solid red" } : {}}
            onChange={(e) => onChange(e)}
            inputtype="input"
            label="Poštanski br."
            placeholder="npr. 11000"
            name="zip"
            value={user_.zip}
            type="text"
          ></Input>
          <input
            type="hidden"
            value={JSON.stringify(orderdata)}
            name="orderdata"
          />
          <input type="hidden" name="rabat" value={user_.rabat} />
          <input type="hidden" name="partnerid" value={user_.partnerid} />
          {/* <div className={styles.line}></div> */}
          <div className={styles.block} onClick={(e) => submitMask(e)}>
            <Submit styles={styles.loginbutton}>Završi narudžbinu</Submit>
          </div>
        </Form>
      </div>
    </div>
  );
}
