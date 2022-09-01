import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { confirmEmailThunk } from "../../../redux/thunks/auth-thunk";

const ConfirmEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.hash) {
      dispatch(confirmEmailThunk({ hash: params.hash }));
    }
    navigate("../auth/signin");
  }, []);
};

export default ConfirmEmail;
