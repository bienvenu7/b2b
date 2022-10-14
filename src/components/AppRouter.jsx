import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getIsAuth } from '../redux/selectors/auth-selectors';
import { privateRoutes, publicRoutes } from '../router';
import { NotFoundPage } from './NotFoundPage/NotFound';
import './AppRouter.scss';

export const AppRouter = () => {
  const isAuth = useSelector(getIsAuth);

  return (
    <>
      {isAuth && (
        <div className="container">
          <Routes>
            {privateRoutes.map((el) => (
              (el.children && el.children.length > 0) ?
              <Route  key={el.path} element={el.component} path={el.path}>
                {el.children.map(child=>{
                  return <Route key={child.path} element={child.component} path={child.path}/>
                })}
              </Route>
              :
              <Route key={el.path} element={el.component} path={el.path} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      )}
      {!isAuth && (
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
