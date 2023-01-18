import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./Header.module.scss";

import { BsPencilSquare } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

import { httpSelector } from "state/http";
import { authState } from "state/auth";
import { modalState } from "state/modal";

import HeaderSearch from "components/HeaderSearch/HeaderSearch";
import CommonBtn from "components/CommonBtn/CommonBtn";
import Logo from "components/Logo/Logo";
import ProfileToggle from "components/ProfileToggle/ProfileToggle";
import Modal from "components/Modal/Modal";

const Header = () => {
  const cx = classNames.bind(styles);

  const http = useRecoilValue(httpSelector);
  const auth = useRecoilValue(authState);
  const modal = useRecoilValue(modalState);
  const setModal = useSetRecoilState(modalState);

  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <header className={cx("container")}>
        <article className={cx("content")}>
          <button className={cx("logo")}>
            <Logo />
          </button>
          <HeaderSearch auth={auth} />
          <ul className={cx("rightBtns", { auth })}>
            <li>
              {auth ? (
                <button type="button" className={cx("iconBox")}>
                  <BsPencilSquare
                    className={cx("icon", { profile: false })}
                    onClick={() => navigate("/post/write")}
                  />
                </button>
              ) : (
                <CommonBtn
                  type={"button"}
                  color={"blue"}
                  text={"글쓰기"}
                  path={"post/write"}
                />
              )}
            </li>
            <li>
              {auth ? (
                <button
                  type="button"
                  className={cx("iconBox")}
                  onMouseDown={() => setShow(!show)}
                  onBlur={() => setShow(false)}
                >
                  <FaUserCircle className={cx("icon", { profile: true })} />
                </button>
              ) : (
                <div
                  onClick={() =>
                    setModal({
                      login: true,
                      signup: false,
                      find: false,
                    })
                  }
                >
                  <CommonBtn type={"button"} color={"white"} text={"로그인"} />
                </div>
              )}
              {show && <ProfileToggle http={http} />}
            </li>
          </ul>
        </article>
      </header>
      {modal.login && <Modal type={"login"} />}
      {modal.signup && <Modal type={"signup"} />}
      {modal.find && <Modal type={"find"} />}
    </>
  );
};

export default React.memo(Header);
