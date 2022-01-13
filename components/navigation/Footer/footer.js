import styles from "./footer.module.css";
import { Half, Row, Col } from "../../UI/Grid";
import Link from "next/link";
import Logowide from "../../UI/logowide";

const footer = () => {
  return (
    <footer className={styles.footer}>
      <Row className={styles.fred}>
        <Col className={styles.fcol}>
          <h3>Kategorije</h3>
          <ul>
            <li>
              <Link href="/webshop/traktori">
                <a>Traktori</a>
              </Link>
            </li>
            <li>
              <Link href="/webshop/beraci">
                <a>Beraci</a>
              </Link>
            </li>
            <li>
              <Link href="/webshop/kombajni">
                <a>Kombajni</a>
              </Link>
            </li>
            <li>
              <Link href="/webshop/freze">
                <a>Freze</a>
              </Link>
            </li>
            <li>
              <Link href="/webshop/polj-mas">
                <a>Delozi za poljoprivredne masine</a>
              </Link>
            </li>
            <li>
              <Link href="/webshop/polj-meh">
                <a>Poljoprivredna mehanizacija</a>
              </Link>
            </li>
          </ul>
        </Col>
        <Col className={styles.fcol}>
          <div className={styles.lwide}>
            <Logowide
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
              <img src="/footer/phone.png" alt="" />
              381/ 61 214 21 13
            </li>
            <li className={styles.kontaktli}>
              <img src="/footer/mail.png" alt="" />
              info@traktorland.rs
            </li>
            <li className={styles.kontaktli}>
              <img src="/footer/location.png" alt="" />
              Marsala tita 133,<br></br>11272 Beograd - Dobanovci
            </li>
          </ul>
        </Col>
      </Row>
    </footer>
  );
};

export default footer;
