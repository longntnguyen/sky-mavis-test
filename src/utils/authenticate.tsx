export const authenticate = () => {
  return localStorage.getItem("isVerify") === "true";
};
