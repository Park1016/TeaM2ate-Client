import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./BoardPost.module.scss";

import FramePost from "containers/FramePost/FramePost";

function BoardPost({ value }) {
  const cx = classNames.bind(styles);
  const navigate = useNavigate();

  const onGoToPost = () => {
    navigate(`post/${value.id}`);
  };

  return (
    <li className={cx("box")} onClick={onGoToPost}>
      <FramePost value={value} board={true} />
    </li>
  );
}

export default BoardPost;
