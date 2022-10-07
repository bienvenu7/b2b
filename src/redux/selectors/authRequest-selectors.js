export const takeBrands = (state) => {
  return state.authRequest.brands;
};

export const takeOrder = (state) => {
  return state.authRequest.order;
};

export const takeBalance = (state) => {
  return state.authRequest.balance;
};

export const takeAngles = (state) => {
  return state.authRequest.angles;
};

export const companyname = (state) => {
  return state.auth.user.companyName;
};
