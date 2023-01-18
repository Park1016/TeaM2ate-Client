import React from "react";
import classNames from "classnames/bind";

import styles from "./ProfilePhoto.module.scss";
import { IoPersonCircleSharp } from "react-icons/io5";

const ProfilePhoto = ({ url, username, mypage }) => {
  const cx = classNames.bind(styles);
  return (
    <>
      {url.length === 0 ? (
        // <p className={cx("nonePhoto", { mypage })}>
        //   {username.substring(0, 1)}
        // </p>
        <IoPersonCircleSharp className={cx("nonePhoto", { mypage })} />
      ) : (
        <img src={url} />
      )}
    </>
  );
};

export default ProfilePhoto;
