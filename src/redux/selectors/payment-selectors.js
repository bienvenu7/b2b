export const getUserTariffPackages = (state) => {
  return state.payment.cart.userTariffPackages;
};

export const getUserCertificatePackage = (state) => {
  return state.payment.cart.userCertificatePackage;
};

export const getCartTotal = (state) => {
  return state.payment.cart.total;
};

export const getInvoiceLink = (state) => {
  return state.payment.invoice.link;
};

export const getCategoryError = (state) => {
  return state.payment.form.errors.category;
};

export const getPrice = (state) => {
  return state.payment.cart.price;
};

export const getTotalPackage = (state) => {
  return state.payment.cart.totalPackage;
};

export const getCosts = (state) => {
  return state.payment.cart.costs;
};
