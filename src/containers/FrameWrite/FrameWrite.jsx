import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./FrameWrite.module.scss";

import {
  progressState,
  tagSelector,
  numSelector,
  typeSelector,
} from "state/local";
import { httpSelector } from "state/http";
import PostApi from "api/post";
import { makeFormData } from "hooks/makeFormData";
import FrameType from "containers/FrameType/FrameType";
import Type from "containers/Type/Type";
import SelectTag from "components/SelectTag/SelectTag";
import PlusBtn from "components/PlusBtn/PlusBtn";
import ChooseBox from "components/ChooseBox/ChooseBox";
import Input from "components/Input/Input";
import TextEditor from "components/TextEditor/TextEditor";
import CommonBtn from "components/CommonBtn/CommonBtn";

const FrameWrite = ({ form, setForm, editId }) => {
  const cx = classNames.bind(styles);
  const navigate = useNavigate();

  const t = useRecoilValue(typeSelector);
  const n = useRecoilValue(numSelector);
  const tag = useRecoilValue(tagSelector);
  const progress = useRecoilValue(progressState);
  const http = useRecoilValue(httpSelector);

  const [show, setShow] = useState(false);

  const nullCheck = () => {
    if (form.title.length === 0) {
      alert("제목을 입력해주세요");
      return true;
    } else if (form.text.length === 0) {
      alert("내용을 입력해주세요");
      return true;
    } else if (form.type.length === 0) {
      alert("모집 유형을 선택해주세요");
      return true;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (nullCheck()) {
      return;
    }

    const cate = "findTeam";
    const title = form.title;
    const text = form.text;
    const tag = JSON.stringify(form.tag);
    const type = JSON.stringify(form.type);
    const progress = form.progress;
    const formData = makeFormData({ cate, title, text, tag, type, progress });

    let res;
    if (editId) {
      res = await new PostApi(http).updatePost(formData, editId);
      if (res) {
        alert("글 수정이 완료되었습니다");
      }
    } else {
      res = await new PostApi(http).writePost(formData);
      if (res) {
        alert("글 작성이 완료되었습니다");
      }
    }

    navigate(`/post/${res.id}`);
  };

  return (
    <section className={cx("container")}>
      <form className={cx("content")} onSubmit={(e) => onSubmit(e)}>
        <article>
          <label className={cx("title")} htmlFor="title">
            제목
          </label>
          <Input
            placeholder={"제목을 입력하세요"}
            type={"text"}
            name={"title"}
            id={"title"}
            value={form.title}
            form={form}
            setForm={setForm}
          />
        </article>
        <article>
          <label className={cx("title")} htmlFor="text">
            내용
          </label>
          <TextEditor
            http={http}
            name={"text"}
            id={"text"}
            value={form.text}
            form={form}
            setForm={setForm}
          />
        </article>
        <article>
          <p className={cx("title")}>태그</p>
          <SelectTag data={tag} form={form} setForm={setForm} />
        </article>
        <article>
          <div className={cx("typeTop")}>
            <p>모집유형</p>
            <button type="button" onClick={() => setShow(!show)}>
              모집유형 선택하기
            </button>
            {/* <PlusBtn setShow={setShow} /> */}
          </div>
          {form.type.length !== 0 && (
            <div className={cx("typeBottom")}>
              <FrameType type={form.type} form={form} setForm={setForm} />
            </div>
          )}
        </article>
        {editId && (
          <article className={cx("progress")}>
            <p>진행 상황</p>
            <ChooseBox form={form} setForm={setForm} data={progress} />
          </article>
        )}
        <div className={cx("line")}></div>
        <CommonBtn
          type={"submit"}
          color={"blue"}
          text={editId ? "수정하기" : "작성하기"}
        />
      </form>
      {show && (
        <Type
          form={form}
          setForm={setForm}
          setShow={setShow}
          t={t}
          n={n}
          editId={editId}
        />
      )}
    </section>
  );
};

export default React.memo(FrameWrite);
