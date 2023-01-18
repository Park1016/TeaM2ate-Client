import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./Bookmark.module.scss";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

import UserApi from "api/user";
import { makeFormData } from "hooks/makeFormData";

const Bookmark = ({ id, http, user }) => {
  const cx = classNames.bind(styles);
  const [bookmark, setBookmark] = useState(false);

  const column = "bookmark";
  const formData = makeFormData({ column, id });

  const onClick = async () => {
    if (bookmark) {
      await new UserApi(http).removeList(formData);
    } else {
      await new UserApi(http).addList(formData);
    }
    setBookmark(!bookmark);
  };

  useEffect(() => {
    if (user.bookmark.includes(parseInt(id))) {
      setBookmark(true);
    } else {
      setBookmark(false);
    }
  }, []);
  return (
    <button className={cx("button")} type="button" onClick={onClick}>
      {bookmark ? <FaBookmark /> : <FaRegBookmark />}
    </button>
  );
};

export default Bookmark;
