import React from "react";
import classNames from "classnames/bind";

import styles from "./AsideRight.module.scss";

const AsideRight = (props) => {
  const cx = classNames.bind(styles);
  return <aside className={cx("container")}>오른쪽</aside>;
};
export default AsideRight;
