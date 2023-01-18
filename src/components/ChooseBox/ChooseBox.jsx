import React from "react";
import classNames from "classnames/bind";

import styles from "./ChooseBox.module.scss";
import { AiOutlineCheck } from "react-icons/ai";

function ChooseBox({ form, setForm, data }) {
  const cx = classNames.bind(styles);
  const onClick = (value) => {
    setForm({ ...form, progress: value });
  };

  return (
    <ul className={cx("container")}>
      {data.map((item, index) => (
        <li
          className={cx("content", { choose: item.value === form.progress })}
          key={index}
          onClick={() => onClick(item.value)}
        >
          {item.value === form.progress && <AiOutlineCheck />}
          <p>{item.name}</p>
        </li>
      ))}
    </ul>
  );
}

export default ChooseBox;
