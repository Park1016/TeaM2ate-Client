import React from "react";
import classNames from "classnames/bind";

import styles from "./ProfileToggle.module.scss";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";

import { authState } from "state/auth";
import { useSetRecoilState } from "recoil";
import UserApi from "api/user";
import { useNavigate } from "react-router-dom";

const ProfileToggle = ({ http }) => {
  const cx = classNames.bind(styles);

  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const onLogout = async () => {
    const check = window.confirm("로그아웃 하시겠습니까?");
    if (check) {
      const logout = await new UserApi(http).logout();
      if (logout) {
        setAuth(false);
        // alert(logout);
      }
    }
  };

  return (
    <article className={cx("container")}>
      <div onMouseDown={() => navigate("/mypage")}>
        <CgProfile />
        <p>마이페이지</p>
      </div>
      <p className={cx("line")}></p>
      <div onMouseDown={onLogout}>
        <IoLogOutOutline />
        <p>로그아웃</p>
      </div>
    </article>
  );
};

export default ProfileToggle;
