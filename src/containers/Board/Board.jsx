import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import classNames from "classnames/bind";

import styles from "./Board.module.scss";

import { httpSelector } from "state/http";
import BoardApi from "api/board";

import BoardPost from "containers/BoardPost/BoardPost";
import Filter from "components/Filter/Filter";

function Board(props) {
  const cx = classNames.bind(styles);
  const http = useRecoilValue(httpSelector);
  const { isLoading, error, data } = useQuery(["board"], async () => {
    return await new BoardApi(http).getBoard();
  });
  const [check, setCheck] = useState(true);

  return (
    <>
      {isLoading && <p>Loading!</p>}
      {error && <p>Error!</p>}
      {data && (
        <>
          <article className={cx("article")}>
            <Filter check={check} setCheck={setCheck} />
            <ul className={cx("postWrap")}>
              {check
                ? data
                    .filter((x) => x.progress === "ing")
                    .map((item) => <BoardPost key={item.id} value={item} />)
                : data.map((item) => <BoardPost key={item.id} value={item} />)}
            </ul>
          </article>
        </>
      )}
    </>
  );
}

export default Board;
