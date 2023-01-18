import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import styles from "./SettingContent.module.scss";

import { httpSelector } from "state/http";
import { authState } from "state/auth";
import UserApi from "api/user";
import UpdateProfile from "containers/UpdateProfile/UpdateProfile";
import Security from "containers/Security/Security";

const SettingContent = (props) => {
  const cx = classNames.bind(styles);
  const auth = useRecoilValue(authState);
  const http = useRecoilValue(httpSelector);
  const [show, setShow] = useState("profile");
  const { data: user } = useQuery(["settingAuth"], async () => {
    if (auth) {
      return await new UserApi(http).me();
    } else {
      return false;
    }
  });

  return (
    <>
      {user && (
        <section className={cx("container")}>
          <div className={cx("content")}>
            <article className={cx("cate")}>
              <p
                className={cx("cateText", { focus: show === "profile" })}
                onClick={() => setShow("profile")}
              >
                내 프로필
              </p>
              <p
                className={cx("cateText", { focus: show === "security" })}
                onClick={() => setShow("security")}
              >
                계정
              </p>
            </article>
            <article className={cx("box")}>
              {show === "profile" && <UpdateProfile http={http} user={user} />}
              {show === "security" && <Security />}
            </article>
          </div>
        </section>
      )}
    </>
  );
};

export default SettingContent;
