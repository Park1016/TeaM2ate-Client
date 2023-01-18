import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./UpdateProfile.module.scss";

import { tagSelector } from "state/local";
import UserApi from "api/user";
import { makeFormData } from "hooks/makeFormData";
import Input from "components/Input/Input";
import Textarea from "components/Textarea/Textarea";
import SelectTag from "components/SelectTag/SelectTag";
import ProfilePhoto from "components/ProfilePhoto/ProfilePhoto";
import CommonBtn from "components/CommonBtn/CommonBtn";

const UpdateProfile = ({ http, user }) => {
  const cx = classNames.bind(styles);
  const _tag = useRecoilValue(tagSelector);
  const { id, url, username, introduce, alert, tag } = user;
  const [form, setForm] = useState({ url, username, introduce, alert, tag });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const url = form.url;
    const username = form.username;
    const introduce = form.introduce;
    const alert = JSON.stringify(form.alert);
    const tag = JSON.stringify(form.tag);

    const formData = makeFormData({ url, username, introduce, alert, tag });

    try {
      const res = await new UserApi(http).update(id, formData);
      if (res) {
        window.alert("수정이 완료되었습니다");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <form className={cx("container")} onSubmit={(e) => onSubmit(e)}>
      <ul className={cx("content")}>
        <li className={cx("top")}>
          <ProfilePhoto url={form.url} username={form.username} mypage={true} />
          <div>
            <label className={cx("title")} htmlFor="username">
              아이디
            </label>
            <Input
              placeholder={"아이디를 입력하세요"}
              type={"text"}
              name={"username"}
              id={"username"}
              value={form.username}
              form={form}
              setForm={setForm}
            />
          </div>
        </li>
        <li>
          <label className={cx("title")} htmlFor="introduce">
            자기소개
          </label>
          <Textarea
            name={"introduce"}
            id={"introduce"}
            value={form.introduce}
            form={form}
            setForm={setForm}
          />
        </li>
        <li>
          <p className={cx("title")}>태그</p>
          <SelectTag data={_tag} form={form} setForm={setForm} />
        </li>
      </ul>
      <article className={cx("buttons")}>
        <div onClick={() => navigate("/mypage")}>
          <CommonBtn type={"button"} color={"white"} text={"취소"} />
        </div>
        <CommonBtn type={"submit"} color={"blue"} text={"저장"} />
      </article>
    </form>
  );
};

export default UpdateProfile;
