import { getCertificate } from '../../api/file/file-api';
// TODO
export const getCertificateThunk = (productId) => async () => {
  try {
    await getCertificate(productId);
  } catch (error) {
    // console.log(error);
  }
};
