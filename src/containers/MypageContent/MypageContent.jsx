import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./MypageContent.module.scss";
import { TfiCommentAlt } from "react-icons/tfi";
import { IoSettingsSharp } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";
import { BsFileText, BsChatDots } from "react-icons/bs";

import { httpSelector } from "state/http";
import { authState } from "state/auth";
import UserApi from "api/user";
import PostApi from "api/post";
import CommentApi from "api/comment";
import ProfilePhoto from "components/ProfilePhoto/ProfilePhoto";
import CommonBtn from "components/CommonBtn/CommonBtn";
import Time from "components/Time/Time";

const MypageContent = (props) => {
  const cx = classNames.bind(styles);
  const http = useRecoilValue(httpSelector);
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();
  const [data, setData] = useState({ post: [], type: "", comment: [] });

  const { data: user } = useQuery(["mypageAuth"], async () => {
    if (auth) {
      return await new UserApi(http).me();
    } else {
      return false;
    }
  });
  const { data: post } = useQuery(["mypagePost"], async () => {
    return await new PostApi(http).getPostByUsername(user.username);
  });
  const { data: comment } = useQuery(["mypageComment"], async () => {
    return await new CommentApi(http).getPostByComment(user.username);
  });
  const { data: bookmark } = useQuery(["mypageBookmark"], async () => {
    return await new PostApi(http).getPostByBookmark(user.username);
  });

  useEffect(() => {
    if (post) {
      setData({ ...data, post, type: "post" });
    }
  }, [user, post]);

  return (
    <>
      {user && (
        <section className={cx("container")}>
          <div className={cx("content")}>
            <article className={cx("user")}>
              <div className={cx("userTop")}>
                <div>
                  <ProfilePhoto
                    url={user.url}
                    username={user.username}
                    mypage={true}
                  />
                  <ul>
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                  </ul>
                </div>
                <div
                  className={cx("setting")}
                  onClick={() => navigate("/settings")}
                >
                  <CommonBtn
                    type={"button"}
                    color={"white"}
                    text={"프로필 수정"}
                  />
                  <IoSettingsSharp />
                </div>
              </div>
              {user.tag.length !== 0 && (
                <ul className={cx("tag")}>
                  {user.tag.map((item, index) => (
                    <li key={index}>#{item}</li>
                  ))}
                </ul>
              )}
              {user.introduce.length !== 0 && (
                <p className={cx("introduce")}>{user.introduce}</p>
              )}
            </article>
            <ul className={cx("filter")}>
              <li
                className={cx("filterList", { focus: data.type === "post" })}
                onClick={() => setData({ post, type: "post", comment: [] })}
              >
                <p>내가 쓴 글</p>
                <BsFileText />
              </li>
              <li
                className={cx("filterList", { focus: data.type === "comment" })}
                onClick={() =>
                  setData({
                    post: comment.post,
                    type: "comment",
                    comment: comment.comment,
                  })
                }
              >
                <p>내가 쓴 댓글</p>
                <BsChatDots />
              </li>
              <li
                className={cx("filterList", {
                  focus: data.type === "bookmark",
                })}
                onClick={() =>
                  setData({ post: bookmark, type: "bookmark", comment: [] })
                }
              >
                <p>북마크</p>
                <FaBookmark />
              </li>
            </ul>
            {data.post && data.post.length !== 0 && data.type !== "comment" && (
              <ul className={cx("post")}>
                {data.post.map((item, index) => (
                  <li key={index} onClick={() => navigate(`/post/${item.id}`)}>
                    <p>{item.title}</p>
                    <Time createdAt={item.createdAt} />
                  </li>
                ))}
              </ul>
            )}
            {data.post && data.post.length !== 0 && data.type === "comment" && (
              <ul className={cx("comment")}>
                {data.comment.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => navigate(`/post/${item.postId}`)}
                  >
                    <div className={cx("commentBox")}>
                      <p>{item.text}</p>
                      <Time createdAt={item.createdAt} />
                    </div>
                    <div className={cx("postBox")}>
                      <p>
                        {data.post.filter((x) => x.id === item.postId)[0].title}
                      </p>
                      <Time
                        createdAt={
                          data.post.filter((x) => x.id === item.postId)[0]
                            .createdAt
                        }
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {(!data.post || data.post.length === 0) && (
              <div className={cx("noData")}>
                <TfiCommentAlt />
                <p>
                  {data.type === "post"
                    ? "내가 작성한 "
                    : data.type === "comment"
                    ? "내가 작성한 댓"
                    : "북마크한 "}
                  글이 없습니다
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default MypageContent;
