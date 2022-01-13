import styles from "./print.module.css";
import Logo from "../Logo/logo";
const print = (props) => {
  let i = 0;
  let cena = 0;
  let cenara = 0;
  var vreme = props.orderaddress.partneraddressts;
  var t = vreme.split(/[- T : Z]/);

  return (
    <div className={styles.print}>
      <Logo />
      <h2>Porudžbenica: </h2>
      <h3>{props.data.ime_prezime}</h3>
      {props.orderaddress.naziv_firme != null ? (
        <>
          <h3>{"Naziv firme: " + props.orderaddress.naziv_firme}</h3>
          <h3>{"PIB: " + props.orderaddress.pib}</h3>
        </>
      ) : null}
      <h3>
        {props.orderaddress.address +
          " " +
          props.orderaddress.city +
          " " +
          props.orderaddress.zip}
      </h3>
      <h3>{"Telefon: " + props.orderaddress.phone}</h3>
      <h3>{"E-mail: " + props.orderaddress.email}</h3>
      <h3>
        {"Datum i vreme porudzbine : " +
          t[2] +
          "/" +
          t[1] +
          "/" +
          t[0] +
          " " +
          t[3] +
          ":" +
          t[4]}
      </h3>
      <table>
        <thead>
          <tr>
            <th>R.B.</th>
            <th>sifra</th>
            <th>Ime</th>
            <th>Kolicina</th>
            <th>Cena po komadu</th>
            <th>Stopa PDV</th>
            <th>Poreska osnovica</th>

            <th>Iznos PDV</th>
            <th>Cena po komadu</th>
            <th>Cena</th>
            <th>Cena po komadu sa Rabatom</th>
            <th>Cena sa Rabatom</th>
          </tr>
        </thead>
        <tbody>
          {props.orders.map((order) => {
            cena += order.qty * order.price * 1.2;
            cenara += order.price2 * order.qty;
            return (
              <tr key={i}>
                <td>{i++}</td>
                <td>{order.code}</td>
                <td style={{ maxWidth: "200px" }}>{order.name}</td>
                <td>{order.qty}</td>
                <td>{Number(order.price * 1.2).toFixed(2)}</td>
                <td>20%</td>
                <td>{Number(order.price).toFixed(2)}</td>
                <td>{Number(0.2 * order.price).toFixed(2)}</td>
                <td>{Number(order.price * 1.2).toFixed(2)}</td>
                <td>{Number(order.qty * order.price * 1.2).toFixed(2)}</td>
                <td>{Number(order.price2).toFixed(2)}</td>
                <td>{Number(order.price2 * order.qty).toFixed(2)}</td>
              </tr>
            );
          })}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Ukupno:</td>
            <td>{Number(cena).toFixed(2)}</td>
            <td></td>
            <td>{Number(cenara).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default print;
