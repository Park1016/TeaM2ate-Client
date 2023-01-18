import React, { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";

import "@toast-ui/editor/dist/i18n/ko-kr";
import PostApi from "api/post";
import { makeFormData } from "hooks/makeFormData";

const TextEditor = ({ http, name, form, setForm }) => {
  const editorRef = useRef();

  const onChange = () => {
    const data = editorRef.current.getInstance().getHTML();
    setForm({ ...form, [name]: data });
  };

  const onUploadImage = async (blob, callback) => {
    const formData = makeFormData({ blob });
    await new PostApi(http).photo(formData);
    // // callback(url, 'alt text');
    // // return false;
    // console.log(url);
    // return false;
  };

  return (
    <Editor
      initialValue={form.text}
      previewStyle="vertical"
      height="auto"
      initialEditType="wysiwyg"
      useCommandShortcut={false}
      language="ko-KR"
      ref={editorRef}
      onChange={onChange}
      plugins={[colorSyntax]}
      hooks={{
        addImageBlobHook: onUploadImage,
      }}
    />
  );
};

export default TextEditor;
