const tokenGenerator = (username) =>
  username + "-" + Math.random().toString(36).substr(2);
export default tokenGenerator;
