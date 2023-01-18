import React from "react";
import classNames from "classnames/bind";

import styles from "./Aside.module.scss";
import AsideLeft from "containers/AsideLeft/AsideLeft";
import AsideRight from "containers/AsideRight/AsideRight";

const Aside = (props) => {
  const cx = classNames.bind(styles);
  return (
    <section className={cx("container")}>
      <AsideLeft />
      <AsideRight />
    </section>
  );
};
export default Aside;
