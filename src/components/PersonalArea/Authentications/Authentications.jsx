import React from "react";
import PersonalAreaLayout from "../PersonalAreaLayout";
import SvgSelector from "../../../common/icons/SvgSelector";
import "./Authentications.scss";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { takeResultStatuses } from "../../../redux/selectors/product-selectors";
import { getProductsThunk } from "../../../redux/thunks/product-thunk";
import { setProducts } from "../../../redux/reducers/product-reducer";
import AuthenticTableBlock from "../../DashbordComponents/AuthenticTableBlock/AuthenticTableBlock";
const Authentications = (props) => {
  const resultStatuses = useSelector(takeResultStatuses);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(null);

  useEffect(() => {
    setPage(
      props.var === "completed"
        ? "complete"
        : props.var === "progress" && "progress"
    );
  });

  function onCompletedClick() {
    navigate("/authentications/completed");
    const data = {
      resultStatuses: [
        resultStatuses &&
          resultStatuses.filter((el) => el.name === "COMPLETED")[0],
      ],
      sort: "createdAt:DESC",
    };
    dispatch(setProducts(null));
    dispatch(getProductsThunk(data)); //
  }

  function onProgressClick() {
    navigate("/authentications/in-progress");
    const data = {
      sort: "createdAt:DESC",
      resultStatuses: resultStatuses.filter((el) => el.name !== "COMPLETED"),
    };
    dispatch(setProducts(null));
    dispatch(getProductsThunk(data));
  }
  if (page === null) {
    return <></>;
  } else {
    return (
      <div className="top">
        <PersonalAreaLayout>
          <div className="authent-container">
            <div className="authent__buttons-wrapper desktop">
              <div
                className={
                  page !== "complete"
                    ? `authent__buttons-elem`
                    : `authent__buttons-elem selected`
                }
                onClick={onCompletedClick}
              >
                Completed
              </div>
              <div
                className={
                  page !== "progress"
                    ? `authent__buttons-elem`
                    : `authent__buttons-elem selected`
                }
                onClick={onProgressClick}
              >
                In progress
              </div>
            </div>
            <AuthenticTableBlock {...props} />
          </div>
        </PersonalAreaLayout>
      </div>
    );
  }
};

export default Authentications;
