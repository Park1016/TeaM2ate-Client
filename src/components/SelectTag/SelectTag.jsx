import React, { useEffect, useState } from "react";
import Select from "react-select";
import classNames from "classnames/bind";

import styles from "./SelectTag.module.scss";

const SelectTag = ({ data, form, setForm }) => {
  const cx = classNames.bind(styles);
  const [defaultvalue, setDefaultValue] = useState(null);
  const onChange = (e) => {
    setForm({ ...form, tag: e.map((item) => item.value) });
  };

  useEffect(() => {
    const res = data.filter((x) => form.tag.includes(x.value));
    setDefaultValue(res);
  }, []);

  return (
    <div className={cx("container")}>
      {defaultvalue && (
        <Select
          onChange={(e) => onChange(e)}
          isMulti={true}
          placeholder={"태그를 선택하세요"}
          options={data}
          defaultValue={defaultvalue}
        />
      )}
    </div>
  );
};

export default SelectTag;
