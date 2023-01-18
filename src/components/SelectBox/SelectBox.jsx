import React from "react";
import classNames from "classnames/bind";

import styles from "./SelectBox.module.scss";
import { TiArrowSortedDown } from "react-icons/ti";

const SelectBox = ({ value, data, defaultValue, disabled }) => {
  const cx = classNames.bind(styles);
  const onChange = (target) => {
    data(target);
  };

  return (
    <div className={cx("container")}>
      <select onChange={(e) => onChange(e.target.value)} disabled={disabled}>
        {defaultValue && (
          <option defaultValue={""} hidden>
            {defaultValue}
          </option>
        )}
        {value.map((item, index) => (
          <option key={index} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
      <TiArrowSortedDown />
    </div>
  );
};

export default SelectBox;
