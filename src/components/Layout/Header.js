import React from "react";

import styles from "./Header.module.css";

import meals from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h2>ReactOrderingApp</h2>
        <HeaderCartButton onClick={props.onShowCart}>Cart</HeaderCartButton>
      </header>
      <div className={styles["main-image"]}>
        <img src={meals} alt="A table with sweets" />
      </div>
    </React.Fragment>
  );
};

export default Header;
