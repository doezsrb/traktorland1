import styles from "./footer.module.css";
import { Half, Row, Col } from "../UI/Grid";
import Link from "next/link";
import Logowide from "../UI/Logo/logowide";

const footer = () => {
  return (
    <footer className={styles.footer}>
      <Row className={styles.fred}>
        <Col className={styles.fcol}>
          <h3>Kategorije</h3>
          <ul>
            <li>
              <Link href="/webshop/traktori?page=1">
                <a>Traktori</a>
              </Link>
            </li>
            <li>
              <Link href="/webshop/beraci?page=1">
                <a>Berači</a>
              </Link>
            </li>
            <li>
              <Link href="/webshop/kombajni?page=1">
                <a>Kombajni</a>
              </Link>
            </li>
            <li>
              <Link href="/webshop/freze?page=1">
                <a>Freze</a>
              </Link>
            </li>
            <li>
              <Link href="/webshop/delovi?page=1">
                <a>Delozi za poljoprivredne mašine</a>
              </Link>
            </li>
            <li>
              <Link href="/webshop/mehanizacija?page=1">
                <a>Poljoprivredna mehanizacija</a>
              </Link>
            </li>
            <li>
              <Link href="/webshop/ostalo?page=1">
                <a>Ostalo</a>
              </Link>
            </li>
          </ul>
        </Col>
        <Col className={styles.fcol}>
          <div className={styles.lwide}>
            <Logowide
              back="transparent"
              color="white"
              font="50px"
              martop="120px"
              marleft="calc(50% - 206.5px)"
            />
          </div>
        </Col>
        <Col className={styles.fcol}>
          <h3>Kontakt</h3>
          <ul>
            <li className={styles.kontaktli}>
              <img src="/footer/phone.svg" alt="" />
              <a href="tel:+38163412447">+381/63 412 447</a>
            </li>
            <li className={styles.kontaktli}>
              <img src="/footer/mail.svg" alt="" />
              <a href="mailto:traktorland1@gmail.com">traktorland1@gmail.com</a>
            </li>
            <li className={styles.kontaktli}>
              <img src="/footer/location.svg" alt="" />
              <a
                href="https://www.google.rs/maps/place/T.R.Marjanovic/@43.1681219,21.8505713,17z/data=!3m1!4b1!4m5!3m4!1s0x4755bd592dfc7da3:0xfc5a1b56d0e6e1c6!8m2!3d43.168118!4d21.85276"
                target="blank"
              >
                Knez Mihajlova 67,<br></br>18255 Pukovac
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </footer>
  );
};

export default footer;
