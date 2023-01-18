import React from "react";
import classNames from "classnames/bind";

import styles from "./Time.module.scss";

import timeCalculate from "hooks/timeCalculate";

const Time = ({ createdAt }) => {
  const cx = classNames.bind(styles);
  return (
    <>
      <p className={cx("time")}>{timeCalculate(createdAt)}</p>
    </>
  );
};

export default Time;
