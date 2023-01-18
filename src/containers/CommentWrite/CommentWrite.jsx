import React, { useState } from "react";
import classNames from "classnames/bind";

import styles from "./CommentWrite.module.scss";

import { makeFormData } from "hooks/makeFormData";
import CommentApi from "api/comment";
import Textarea from "components/Textarea/Textarea";
import CommonBtn from "components/CommonBtn/CommonBtn";

function CommentWrite({ http, id, setData, value, setEdit }) {
  const cx = classNames.bind(styles);
  const [form, setForm] = useState({ comment: value ? value.text : "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.comment.length === 0) {
      alert("댓글을 입력해주세요");
      return;
    }

    const postId = id;
    const text = form.comment;
    const formData = makeFormData({ postId, text });

    if (value) {
      await new CommentApi(http).updateComment(formData, value.id);
      setEdit(false);
    } else {
      await new CommentApi(http).writeComment(formData);
    }
    const res = await new CommentApi(http).getCommentByPostId(id);
    setData(res);
    setForm({ comment: "" });
  };

  return (
    <form className={cx("container")} onSubmit={(e) => onSubmit(e)}>
      <article className={cx("textarea")}>
        <Textarea
          name={"comment"}
          id={"comment"}
          value={form.comment}
          placeholder={"댓글을 입력하세요"}
          form={form}
          setForm={setForm}
        />
      </article>
      <article className={cx("button")}>
        <CommonBtn type={"submit"} color={"blue"} text={"등록"} />
        {value && (
          <div onClick={() => setEdit(false)}>
            <CommonBtn type={"button"} color={"white"} text={"취소"} />
          </div>
        )}
      </article>
    </form>
  );
}

export default CommentWrite;
