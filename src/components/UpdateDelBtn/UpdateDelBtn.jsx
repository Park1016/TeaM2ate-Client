import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./UpdateDelBtn.module.scss";
import { FiMoreVertical } from "react-icons/fi";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";

import { httpSelector } from "state/http";
import CommentApi from "api/comment";
import PostApi from "api/post";

function UpdateDelBtn({ type, id, setEdit, setData }) {
  const cx = classNames.bind(styles);
  const [show, setShow] = useState(false);

  const http = useRecoilValue(httpSelector);

  const navigate = useNavigate();

  const onUpdate = async () => {
    switch (type) {
      case "post":
        navigate(`/post/update/${id}`);
        break;
      case "comment":
        setEdit(true);
        break;
      default:
        break;
    }
  };

  const onDelete = async () => {
    const check = window.confirm(
      `${type === "post" ? "게시글을" : "댓글을"} 삭제하시겠습니까?`
    );
    if (!check) {
      return;
    }
    switch (type) {
      case "post":
        await new PostApi(http).deletePost(id);
        alert("게시글이 삭제되었습니다");
        navigate("/");
        break;
      case "comment":
        await new CommentApi(http).deleteComment(id);
        const res = await new CommentApi(http).getCommentByPostId(id);
        setData(res);
        // alert("댓글이 삭제되었습니다");
        break;
      default:
        break;
    }
    setShow(false);
  };

  return (
    <div className={cx("container")}>
      <button
        className={cx("button")}
        type="button"
        onMouseDown={() => setShow(!show)}
        onBlur={() => setShow(false)}
      >
        <FiMoreVertical />
      </button>
      {show && (
        <ul className={cx("toggle")}>
          <li onMouseDown={onUpdate}>
            <FaPencilAlt />
            <p>수정</p>
          </li>
          <li onMouseDown={onDelete}>
            <RiDeleteBin2Line />
            <p>삭제</p>
          </li>
        </ul>
      )}
    </div>
  );
}

export default UpdateDelBtn;
