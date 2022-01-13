import styles from "./korisnici.module.css";
import Korisnik from "./Korisnik/index";

const korisnici = ({ users, deletefunc }) => {
  return (
    <div className={styles.korisnici}>
      {users.map((user) => (
        <Korisnik
          key={user.partnerid}
          deletefunc={deletefunc}
          id={user.partnerid}
          ime={user.name}
          adresa={user.address}
          datum={user.partnerts}
          rabat={user.rabat}
        />
      ))}
    </div>
  );
};

export default korisnici;
