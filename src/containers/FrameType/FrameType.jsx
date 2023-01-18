import React, { useState } from "react";
import classNames from "classnames/bind";

import styles from "./FrameType.module.scss";
import { TiDelete } from "react-icons/ti";

import EditType from "containers/EditType/EditType";

function FrameType({ type, form, setForm }) {
  const cx = classNames.bind(styles);
  const [data, setData] = useState({ show: false, item: null });

  const onDelete = (item) => {
    const obj = form.type.filter(
      (x) => Object.keys(x)[0] !== Object.keys(item)[0]
    );
    setForm({ ...form, type: obj });
  };

  const onEdit = (item) => {
    if (!form) {
      return;
    }
    setData({ show: true, item });
  };

  return (
    <>
      {type.length !== 0 && (
        <ul className={cx("container")}>
          {type.map((item, index) => (
            <li
              className={cx("list", {
                done:
                  Object.values(item)[0].num ===
                  Object.values(item)[0].totalNum,
                write: form,
              })}
              key={index}
            >
              <div className={cx("type")} onClick={() => onEdit(item)}>
                <p>{Object.keys(item)}</p>
                <div className={cx("number")}>
                  <p>{Object.values(item)[0].num}</p>
                  <p>/</p>
                  <p>{Object.values(item)[0].totalNum}</p>
                </div>
              </div>
              {form && (
                <TiDelete
                  className={cx("delIcon")}
                  onClick={() => onDelete(item)}
                />
              )}
            </li>
          ))}
        </ul>
      )}
      {data.show && (
        <EditType form={form} setForm={setForm} data={data} setData={setData} />
      )}
    </>
  );
}

export default FrameType;
