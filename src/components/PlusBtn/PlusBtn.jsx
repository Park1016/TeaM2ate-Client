import React from "react";
import { BsPlusSquareDotted } from "react-icons/bs";
import classNames from "classnames/bind";

import styles from "./PlusBtn.module.scss";

function PlusBtn({ setShow }) {
  const cx = classNames.bind(styles);
  return (
    <button className={cx("icon")}>
      <BsPlusSquareDotted onClick={() => setShow(true)} />
    </button>
  );
}

export default PlusBtn;
