import React from "react";
import { useSetRecoilState } from "recoil";
import classNames from "classnames/bind";

import styles from "./Modal.module.scss";
import { GrClose } from "react-icons/gr";

import Logo from "components/Logo/Logo";
import { modalState } from "state/modal";
import Login from "containers/Login/Login";
import SignUp from "containers/SignUp/SignUp";
import FindAuth from "containers/FindAuth/FindAuth";

const Modal = ({ type }) => {
  const cx = classNames.bind(styles);
  const setModal = useSetRecoilState(modalState);
  return (
    <section className={cx("container")}>
      <div className={cx("content")}>
        <Logo />
        <GrClose
          onClick={() =>
            setModal({
              login: false,
              signup: false,
              find: false,
            })
          }
        />
        {type === "login" && <Login />}
        {type === "signup" && <SignUp />}
        {type === "find" && <FindAuth />}
      </div>
    </section>
  );
};

export default Modal;
