import React from "react";
import { useSetRecoilState } from "recoil";
import LoginForm from "containers/LoginForm/LoginForm";
import classNames from "classnames/bind";

import styles from "./Login.module.scss";

import { modalState } from "state/modal";

const Login = (props) => {
  const cx = classNames.bind(styles);
  const setModal = useSetRecoilState(modalState);

  return (
    <>
      <LoginForm />
      <div className={cx("line")}></div>
      <article className={cx("bottom")}>
        <p
          onClick={() =>
            setModal({
              login: false,
              signup: true,
              find: false,
            })
          }
        >
          회원가입
        </p>
        <p
          onClick={() =>
            setModal({
              login: false,
              signup: false,
              find: true,
            })
          }
        >
          계정찾기
        </p>
      </article>
    </>
  );
};

export default Login;
