const dateCoder = (data) => {
  const date = new Date(data);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  return d + "/" + m + "/" + y;
};

export default dateCoder;
