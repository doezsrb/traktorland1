import styles from "../../styles/Logo.module.css";
const logowide = (props) => {
  return (
    <div
      style={{
        color: props.color,
        fontSize: props.font,
        marginTop: props.martop,
        textAlign: "center",
        marginLeft: props.marleft,
      }}
      className={styles.logowide}
    >
      TRAKTORLAND.<span className={styles.span}>RS</span>
    </div>
  );
};

export default logowide;
