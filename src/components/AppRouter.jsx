import React from 'react'
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { getIsAuth } from "../redux/selectors/auth-selectors";
import { publicRoutes, privateRoutes } from "../router";
import NotFoundPage from "./NotFoundPage/NotFound";
import "../components/AppRouter.scss"

const AppRouter = () => {
  const isAuth = useSelector(getIsAuth);

  return (
    <>
      {isAuth ? (
        <div
          className="container"
        >
          <Routes>
            {privateRoutes.map((el) => (
              <Route key={el.path} element={el.component} path={el.path} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          {publicRoutes.map((el) => (
            <Route key={el.path} element={el.component} path={el.path} />
          ))}
          <Route path="*" element={<Navigate to="signin" />} />
        </Routes>
      )}
    </>
  );
};

export default AppRouter;
