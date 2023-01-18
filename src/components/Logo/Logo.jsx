import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./Logo.module.scss";

const Logo = (props) => {
  const cx = classNames.bind(styles);

  return (
    <div className={cx("logo")}>
      <Link to={"/"}>
        <p>
          <span>Tea</span>
          <span>
            <span>M</span>
            <span>2</span>
          </span>
          <span>ate</span>
        </p>
      </Link>
    </div>
  );
};

export default Logo;
