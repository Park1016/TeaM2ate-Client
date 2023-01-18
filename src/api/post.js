import axios from "axios";

export default class PostApi {
  constructor(http) {
    this.post = axios.create({
      ...http,
      baseURL: `${process.env.REACT_APP_BASE_URL}/post`,
    });
  }

  async getPostById(id) {
    try {
      const res = await this.post.get(`${id}`);
      return res.data;
    } catch (error) {
      alert(error.response.data.message);
      return false;
    }
  }

  async getPostByUsername(username) {
    try {
      const res = await this.post.get(`?username=${username}`);
      return res.data;
    } catch (error) {
      alert(error.response.data.message);
      console.log(error.response);
    }
  }

  async photo(formData) {
    try {
      const res = await this.post.post("photo", formData);
      return res.data;
    } catch (error) {
      console.log(error.response);
    }
  }

  async writePost(formData) {
    try {
      const res = await this.post.post("write", formData);
      return res.data;
    } catch (error) {
      alert(error.response.data.message);
      console.log(error.response);
    }
  }

  async updatePost(formData, id) {
    try {
      const res = await this.post.put(`update/${id}`, formData);
      return res.data;
    } catch (error) {
      alert(error.response.data.message);
      console.log(error.response);
    }
  }

  async addList(formData, id) {
    try {
      const res = await this.post.put(`addList/${id}`, formData);
      return res.data;
    } catch (error) {
      alert(error.response.data.message);
      console.log(error.response);
    }
  }

  async deletePost(id) {
    try {
      const res = await this.post.delete(`delete/${id}`);
      return res.data;
    } catch (error) {
      alert(error.response.data.message);
      console.log(error.response);
    }
  }

  async getPostByBookmark(username) {
    try {
      const res = await this.post.get(`post/${username}`);
      return res.data;
    } catch (error) {
      alert(error.response.data.message);
      console.log(error.response);
    }
  }
}
