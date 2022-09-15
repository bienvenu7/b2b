export const getIsAuth = (state) => {
  return state.auth.isAuth;
};

export const getIsRegister = (state) => {
  return state.auth.isRegister
}

export const getUserId = (state) => {
  return state.auth.user.id;
};
