import React, { useCallback } from "react";
import classNames from "classnames/bind";

import styles from "./Input.module.scss";
const Input = ({
  placeholder,
  type,
  name,
  id,
  value,
  form,
  setForm,
  readOnly,
}) => {
  const cx = classNames.bind(styles);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  return (
    <input
      className={cx("container")}
      placeholder={placeholder}
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={(e) => onChange(e)}
      readOnly={readOnly}
    />
  );
};

export default Input;
