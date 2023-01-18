import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import classNames from "classnames/bind";

import styles from "./LoginForm.module.scss";

import { httpSelector } from "state/http";
import { authState } from "state/auth";
import { modalState } from "state/modal";
import UserApi from "api/user";
import { makeFormData } from "hooks/makeFormData";
import Input from "components/Input/Input";
import CommonBtn from "components/CommonBtn/CommonBtn";

const LoginForm = (props) => {
  const cx = classNames.bind(styles);
  const http = useRecoilValue(httpSelector);
  const setAuth = useSetRecoilState(authState);
  const setModal = useSetRecoilState(modalState);
  const [form, setForm] = useState({ id: "", pw: "" });

  const onSubmit = async (e) => {
    e.preventDefault();

    const username = form.id;
    const password = form.pw;

    const formData = makeFormData({ username, password });

    try {
      const res = await new UserApi(http).login(formData);
      setAuth(res.id);
      setForm({ id: "", pw: "" });
      setModal({
        login: false,
        signup: false,
        find: false,
      });
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <form className={cx("container")} onSubmit={(e) => onSubmit(e)}>
      <article className={cx("inputBox")}>
        <label htmlFor="id">아이디</label>
        <Input
          placeholder={"아이디를 입력하세요"}
          type={"text"}
          name={"id"}
          id={"id"}
          value={form.id}
          form={form}
          setForm={setForm}
        />
      </article>
      <article className={cx("inputBox")}>
        <label htmlFor="pw">비밀번호</label>
        <Input
          placeholder={"비밀번호를 입력하세요"}
          type={"password"}
          name={"pw"}
          id={"pw"}
          value={form.pw}
          form={form}
          setForm={setForm}
        />
      </article>
      <CommonBtn type={"submit"} color={"blue"} text={"로그인"} />
    </form>
  );
};

export default LoginForm;
