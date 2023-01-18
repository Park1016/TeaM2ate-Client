const getDate = (timeStamp) => {
  const post_date = new Date(timeStamp);
  const year = post_date.getFullYear();
  const month =
    post_date.getMonth() < 10
      ? `${post_date.getMonth()}`
      : post_date.getMonth();
  const date =
    post_date.getDate() < 10
      ? `0${post_date.getDate()}`
      : `${post_date.getDate()}`;
  const hour =
    post_date.getHours() < 10
      ? `0${post_date.getHours()}`
      : `${post_date.getHours()}`;
  const minute =
    post_date.getMinutes() < 10
      ? `0${post_date.getMinutes()}`
      : `${post_date.getMinutes()}`;
  return `${year.toString().substring(0, 2)}.${month + 1}.${date}`;
};

export default getDate;
