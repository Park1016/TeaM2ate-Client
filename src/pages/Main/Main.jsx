import React from "react";
import styles from "./Main.module.scss";
import classNames from "classnames/bind";
import Board from "containers/Board/Board";

const Main = (props) => {
  const cx = classNames.bind(styles);

  return (
    <section className={cx("container")}>
      <Board />
    </section>
  );
};

export default Main;
