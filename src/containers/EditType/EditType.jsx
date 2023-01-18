import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import classNames from "classnames/bind";

import styles from "./EditType.module.scss";

import { numSelector, typeSelector } from "state/local";
import SelectBox from "components/SelectBox/SelectBox";
import CommonBtn from "components/CommonBtn/CommonBtn";

function EditType({ form, setForm, data, setData }) {
  const cx = classNames.bind(styles);

  const t = useRecoilValue(typeSelector);
  const n = useRecoilValue(numSelector);

  const [type, setType] = useState(Object.keys(data.item));
  const [num, setNum] = useState(Object.values(data.item)[0].num);
  const [totalNum, setTotalNum] = useState(
    Object.values(data.item)[0].totalNum
  );

  const onFinish = () => {
    const obj = {
      [type]: {
        num: parseInt(num),
        totalNum: parseInt(totalNum),
      },
    };
    const arr = form.type.filter((x) => Object.keys(x)[0] !== type[0]);
    setForm({ ...form, type: [...arr, obj] });
    setData({ ...data, show: false });
  };

  return (
    <>
      {t && n && (
        <ul className={cx("container")}>
          <li>
            <p>유형</p>
            <SelectBox
              value={t}
              data={setType}
              defaultValue={type}
              disabled={true}
            />
          </li>
          <li>
            <p>모집 인원</p>
            <SelectBox
              value={n.slice(1)}
              data={setTotalNum}
              defaultValue={totalNum}
            />
          </li>
          <li>
            <p>모집된 인원</p>
            <SelectBox
              value={n.slice(0, parseInt(totalNum) + 1)}
              data={setNum}
              defaultValue={num}
            />
          </li>
          <li className={cx("buttons")}>
            <div onClick={() => setData({ ...data, show: false })}>
              <CommonBtn type={"button"} color={"white"} text={"취소"} />
            </div>
            <div onClick={onFinish}>
              <CommonBtn type={"button"} color={"blue"} text={"수정완료"} />
            </div>
          </li>
        </ul>
      )}
    </>
  );
}

export default EditType;
