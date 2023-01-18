import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./DeleteUser.module.scss";

import { authState } from "state/auth";
import { httpSelector } from "state/http";
import UserApi from "api/user";

const DeleteUser = (props) => {
  const cx = classNames.bind(styles);
  const auth = useRecoilValue(authState);
  const setAuth = useSetRecoilState(authState);
  const http = useRecoilValue(httpSelector);
  const navigate = useNavigate();
  const onClick = async () => {
    const check = window.confirm("회원을 탈퇴하시겠습니까?");
    if (!check) {
      return;
    }
    const res = await new UserApi(http).delete(auth);
    if (res) {
      const logout = await new UserApi(http).logout();
      if (logout) {
        setAuth(false);
        alert("회원탈퇴가 완료되었습니다");
        navigate("/");
      }
    }
  };
  return (
    <button className={cx("button")} type="button" onClick={onClick}>
      회원탈퇴
    </button>
  );
};

export default DeleteUser;
