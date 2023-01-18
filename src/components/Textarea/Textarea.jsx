import React, { useEffect, useRef } from "react";
import classNames from "classnames/bind";

import styles from "./Textarea.module.scss";

const Textarea = ({
  name,
  id,
  value,
  placeholder,
  form,
  setForm,
  readOnly,
}) => {
  const cx = classNames.bind(styles);
  const textarea = useRef(null);
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const autoResizeTextarea = () => {
    if (textarea.current) {
      textarea.current.style.height = "auto";
      let height = textarea.current.scrollHeight;
      textarea.current.style.height = `calc(${height}px + 3rem)`;
    }
  };

  const autoReadOnly = () => {
    if (textarea.current) {
      textarea.current.style.height = "auto";
      let height = textarea.current.scrollHeight;
      textarea.current.style.height = `${height}px`;
    }
  };

  useEffect(() => {
    if (readOnly) {
      autoReadOnly();
    } else {
      autoResizeTextarea();
    }
  }, []);

  return (
    <textarea
      className={cx("textarea", { readOnly })}
      ref={textarea}
      type="text"
      name={name}
      id={id}
      value={value}
      placeholder={placeholder}
      maxLength="1200"
      onKeyDown={autoResizeTextarea}
      onKeyUp={autoResizeTextarea}
      onChange={(e) => onChange(e)}
      readOnly={readOnly}
    />
  );
};

export default Textarea;
