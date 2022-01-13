import { useState } from "react";
import styles from "./dropdown.module.css";

const dropdown = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggling = () => setIsOpen(!isOpen);
  const [selectedOption, setSelectedOption] = useState("SRB");

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(true);
  };

  return (
    <div className={styles.DropDownContainer}>
      <div onClick={toggling} className={styles.DropDownHeader}>
        <img src={"/header/" + selectedOption + ".png"} alt="" />{" "}
        {selectedOption}
      </div>
      {!isOpen && (
        <div className={styles.DropDownListContainer}>
          <ul className={styles.DropDownList}>
            <li onClick={onOptionClicked("SRB")} className={styles.ListItem}>
              <img src="/header/SRB.png" alt="" /> SRB
            </li>
            <li onClick={onOptionClicked("ENG")} className={styles.ListItem}>
              <img src="/header/ENG.png" alt="" /> ENG
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default dropdown;
