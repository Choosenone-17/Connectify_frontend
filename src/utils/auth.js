export const login = (token, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};

export const isAuth = () => {
  return !!localStorage.getItem("token");
};

export const getRole = () => {
  return localStorage.getItem("role");
};
