import UserApi from "api/user";

export const sendEmail = async (http, formData) => {
  try {
    const res = await new UserApi(http).certEmail(formData);
    if (res) {
      return res;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error.response.data);
    return false;
  }
};

export const checkAuth = async (http, formData) => {
  try {
    const res = await new UserApi(http).checkAuthNum(formData);
    if (res) {
      return res.status;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error.response.data);
    return false;
  }
};
