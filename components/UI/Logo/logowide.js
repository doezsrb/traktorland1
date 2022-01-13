import styles from "./logo.module.css";
const logowide = (props) => {
  const styless = [styles.logowide];
  {
    props.styles ? styless.push(props.styles) : null;
  }
  return (
    <div
      style={{
        backgroundColor: props.back,
        color: props.color,
        fontSize: props.font,
        marginTop: props.martop,
        textAlign: "center",
        marginLeft: props.marleft,
      }}
      className={styless.join(" ")}
    >
      TRAKTORLAND.<span className={styles.span}>RS</span>
    </div>
  );
};

export default logowide;
