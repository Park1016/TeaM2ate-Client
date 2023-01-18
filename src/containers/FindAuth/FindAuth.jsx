import React, { useState } from "react";
import classNames from "classnames/bind";

import styles from "./FindAuth.module.scss";

import FindPw from "containers/FindPw/FindPw";
import CertEmail from "components/CertEmail/CertEmail";
import { modalState } from "state/modal";
import { useSetRecoilState } from "recoil";
import CommonBtn from "components/CommonBtn/CommonBtn";

function FindAuth(props) {
  const cx = classNames.bind(styles);
  const setModal = useSetRecoilState(modalState);
  const [form, setForm] = useState({ email: "", username: "" });
  const [checkEmail, setCheckEmail] = useState(false);

  return (
    <section className={cx("container")}>
      {!checkEmail && (
        <CertEmail
          form={form}
          setForm={setForm}
          setCheckEmail={setCheckEmail}
          checkDup={false}
        />
      )}
      {checkEmail && <FindPw user={form} />}
      <div
        className={cx("cancelBtn")}
        onClick={() =>
          setModal({
            login: true,
            signup: false,
            find: false,
          })
        }
      >
        <CommonBtn type={"button"} color={"blue"} text={"취소"} />
      </div>
    </section>
  );
}

export default FindAuth;
