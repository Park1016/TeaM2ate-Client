import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import PostApi from "api/post";

import { httpSelector } from "state/http";
import { authState } from "state/auth";
import FrameWrite from "containers/FrameWrite/FrameWrite";

const UpdatePost = (props) => {
  const { id } = useParams();
  const http = useRecoilValue(httpSelector);
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();
  const { data } = useQuery(["post", id], async () => {
    return await new PostApi(http).getPostById(id);
  });

  const [form, setForm] = useState();

  useEffect(() => {
    if (data) {
      if (auth !== data.userId) {
        alert("글 수정,삭제는 작성자 본인만 할 수 있습니다");
        navigate("/");
      }
      setForm({
        title: data.title,
        text: data.text,
        tag: data.tag,
        type: data.type,
        progress: data.progress,
      });
    }
  }, [data]);

  return (
    <>{form && <FrameWrite form={form} setForm={setForm} editId={id} />}</>
  );
};

export default UpdatePost;
