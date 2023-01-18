import React from "react";
import { useSetRecoilState } from "recoil";
import classNames from "classnames/bind";

import styles from "./SignUp.module.scss";

import { modalState } from "state/modal";
import SignUpForm from "containers/SignUpForm/SignUpForm";

function SignUp(props) {
  const cx = classNames.bind(styles);
  const setModal = useSetRecoilState(modalState);
  return (
    <section className={cx("container")}>
      <SignUpForm />
      <p className={cx("loginBtn")}>
        이미 회원이신가요?{" "}
        <span
          onClick={() =>
            setModal({
              login: true,
              signup: false,
              find: false,
            })
          }
        >
          로그인
        </span>
      </p>
    </section>
  );
}

export default SignUp;
