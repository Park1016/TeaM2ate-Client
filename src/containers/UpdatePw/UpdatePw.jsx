import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import classNames from "classnames/bind";

import styles from "./UpdatePw.module.scss";
import { BsKeyFill } from "react-icons/bs";

import { authState } from "state/auth";
import { httpSelector } from "state/http";
import { modalState } from "state/modal";
import UserApi from "api/user";
import { makeFormData } from "hooks/makeFormData";
import Input from "components/Input/Input";
import CommonBtn from "components/CommonBtn/CommonBtn";

const UpdatePw = (props) => {
  const cx = classNames.bind(styles);
  const auth = useRecoilValue(authState);
  const http = useRecoilValue(httpSelector);
  const setAuth = useSetRecoilState(authState);
  const setModal = useSetRecoilState(modalState);
  const [form, setForm] = useState({ newPw: "", checkPw: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.newPw.length === 0) {
      alert("새로운 비밀번호를 입력해주세요");
      return;
    }
    if (form.checkPw !== form.newPw) {
      alert("비밀번호가 서로 일치하지 않습니다");
      return;
    }

    const id = auth;
    const password = form.newPw;
    const formData = makeFormData({ id, password });
    const res = await new UserApi(http).updatePw(formData);
    if (res) {
      alert("비밀번호가 변경되었습니다. 다시 로그인 해주세요.");
      await new UserApi(http).logout();
      setAuth(false);
      setModal({
        login: true,
        signup: false,
        find: false,
      });
    } else {
      console.log(res.data);
    }
  };

  return (
    <form className={cx("container")} onSubmit={(e) => onSubmit(e)}>
      <div>
        <BsKeyFill />
        <p>비밀번호 변경</p>
      </div>
      <Input
        placeholder={"새로운 비밀번호를 입력하세요"}
        type={"password"}
        name={"newPw"}
        id={"newPw"}
        value={form.newPw}
        form={form}
        setForm={setForm}
      />
      <Input
        placeholder={"비밀번호를 한번 더 입력하세요"}
        type={"password"}
        name={"checkPw"}
        id={"checkPw"}
        value={form.checkPw}
        form={form}
        setForm={setForm}
      />
      <CommonBtn type={"submit"} color={"blue"} text={"완료"} />
    </form>
  );
};

export default UpdatePw;
