import React, { useState } from "react";
import classNames from "classnames/bind";

import styles from "./Filter.module.scss";
import { BsCheck } from "react-icons/bs";

function Filter({ check, setCheck }) {
  const cx = classNames.bind(styles);

  return (
    <div
      className={cx("container", { check })}
      onClick={() => setCheck(!check)}
    >
      <BsCheck />
      <p>모집 중만 보기</p>
    </div>
  );
}

export default Filter;
