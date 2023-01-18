import React from "react";
import classNames from "classnames/bind";

import styles from "./AsideLeft.module.scss";

const AsideLeft = (props) => {
  const cx = classNames.bind(styles);
  return <aside className={cx("container")}>왼쪽</aside>;
};
export default AsideLeft;
