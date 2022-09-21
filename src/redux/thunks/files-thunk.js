import { getCertificate } from "../../api/file/file-api";
import { setCertificateLink } from "../reducers/files-reducer";

export const getCertificateThunk = (productId) => async (dispatch) => {
  try {
    const response = await getCertificate(productId);
    // console.log(response);
    //dispatch(setCertificateLink())
  } catch (error) {}
};
