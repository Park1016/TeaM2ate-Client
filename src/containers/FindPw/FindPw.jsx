import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { modalState } from "state/modal";
import { httpSelector } from "state/http";
import UserApi from "api/user";
import { makeFormData } from "hooks/makeFormData";
import Input from "components/Input/Input";

const FindPw = ({ user }) => {
  const [form, setForm] = useState({ pw: "", checkPw: "" });
  const http = useRecoilValue(httpSelector);
  const setModal = useSetRecoilState(modalState);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.pw !== form.checkPw) {
      alert("비밀번호가 서로 일치하지 않습니다");
      return;
    }
    const email = user.email;
    const password = form.pw;
    const formData = makeFormData({ email, password });
    const res = await new UserApi(http).findPw(formData);
    if (res) {
      alert("비밀번호가 변경되었습니다. 변경된 비밀번호로 로그인해주세요.");
      setModal({
        login: true,
        signup: false,
        find: false,
      });
    }
  };

  useEffect(() => {
    // 새로고침 시 이메일인증 다시해야된다고 알림
  }, []);

  return (
    <>
      <form onSubmit={(e) => onSubmit(e)}>
        <p>{`회원님의 아이디는 ${user.username}입니다.`}</p>
        <p>비밀번호를 변경해주세요</p>
        <Input
          placeholder={"새로운 비밀번호를 입력하세요"}
          type={"password"}
          name={"pw"}
          id={"pw"}
          value={form.pw}
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
        <button type="submit">변경하기</button>
      </form>
    </>
  );
};

export default FindPw;
