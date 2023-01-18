import axios from "axios";

export default class CommentApi {
  constructor(http) {
    this.comment = axios.create({
      ...http,
      baseURL: `${process.env.REACT_APP_BASE_URL}/comment`,
    });
  }

  async getCommentByPostId(postId) {
    try {
      const res = await this.comment.get(`${postId}`);
      return res.data;
    } catch (error) {
      alert(error.response.data.message);
      console.log(error.response);
    }
  }

  async getCommentByUsername(username) {
    try {
      const res = await this.comment.get(`?username=${username}`);
      return res.data;
    } catch (error) {
      alert(error.response.data.message);
      console.log(error.response);
    }
  }

  async getPostByComment(username) {
    try {
      const res = await this.comment.get(`post/${username}`);
      return res.data;
    } catch (error) {
      alert(error.response.data.message);
      console.log(error.response);
    }
  }

  async writeComment(formData) {
    try {
      const res = await this.comment.post("write", formData);
      return res.data;
    } catch (error) {
      // alert(error.response.data.message);
      console.log(error.response.data.message);
      // if(error.response.data.message === 'Invalid Token Error') {
      // }
    }
  }

  async updateComment(formdata, id) {
    try {
      const res = await this.comment.put(`update/${id}`, formdata);
      return res.data;
    } catch (error) {
      alert(error.response.data.message);
      console.log(error.response);
    }
  }

  async deleteComment(id) {
    try {
      const res = await this.comment.delete(`delete/${id}`);
      return res.data;
    } catch (error) {
      alert(error.response.data.message);
      console.log(error.response);
    }
  }
}
