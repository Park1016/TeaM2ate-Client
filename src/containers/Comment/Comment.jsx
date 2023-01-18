import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import styles from "./Comment.module.scss";

import { httpSelector } from "state/http";
import CommentApi from "api/comment";
import CommentWrite from "containers/CommentWrite/CommentWrite";
import CommentContent from "containers/CommentContent/CommentContent";

function Comment(props) {
  const cx = classNames.bind(styles);
  const http = useRecoilValue(httpSelector);
  const { id } = useParams();
  const [data, setData] = useState();

  const { data: comment } = useQuery(["comment"], async () => {
    return await new CommentApi(http).getCommentByPostId(id);
  });

  useEffect(() => {
    if (comment) {
      setData(comment);
    }
  }, [comment]);

  return (
    <article className={cx("container")}>
      <CommentWrite http={http} id={id} setData={setData} value={undefined} />
      {data && (
        <ul className={cx("content")}>
          {data.map((item, index) => (
            <CommentContent
              key={index}
              http={http}
              id={id}
              setData={setData}
              item={item}
              index={index}
            />
          ))}
        </ul>
      )}
    </article>
  );
}

export default Comment;
