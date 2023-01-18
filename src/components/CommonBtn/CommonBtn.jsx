import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./CommonBtn.module.scss";

const CommonBtn = ({ type, color, text, path }) => {
  const cx = classNames.bind(styles);

  return (
    <button
      className={cx("container", { color: color === "blue" ? true : false })}
      type={type}
    >
      {path ? <Link to={path}>{text}</Link> : <p>{text}</p>}
    </button>
  );
};

export default CommonBtn;
