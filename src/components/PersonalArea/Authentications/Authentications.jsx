import React, { useEffect, useState } from 'react';
import './Authentications.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PersonalAreaLayout } from '../PersonalAreaLayout';
import { takeResultStatuses } from '../../../redux/selectors/product-selectors';
import { getProductsThunk } from '../../../redux/thunks/product-thunk';
import { setProducts } from '../../../redux/reducers/product-reducer';
import { AuthenticTableBlock } from '../../DashbordComponents/AuthenticTableBlock/AuthenticTableBlock';

export const Authentications = ({ var: someVar }) => {
  // TODO
  const resultStatuses = useSelector(takeResultStatuses);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(null);

  useEffect(() => {
    setPage(someVar === 'completed' ? 'complete' : someVar === 'progress' && 'progress');
  });

  function onCompletedClick() {
    navigate('/authentications/completed');
    const data = {
      resultStatuses: [resultStatuses && resultStatuses.filter((el) => el.name === 'COMPLETED')[0]],
      sort: 'createdAt:DESC',
    };
    dispatch(setProducts(null));
    dispatch(getProductsThunk(data)); //
  }

  function onProgressClick() {
    navigate('/authentications/in-progress');
    const data = {
      sort: 'createdAt:DESC',
      resultStatuses: resultStatuses.filter((el) => el.name !== 'COMPLETED'),
    };
    dispatch(setProducts(null));
    dispatch(getProductsThunk(data));
  }

  if (page == null) {
    return <div />;
  }
  return (
    <div className="top">
      <PersonalAreaLayout>
        <div className="authent-container">
          <div className="authent__buttons-wrapper desktop">
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
            jsx-a11y/no-static-element-interactions */}
            <div
              className={page !== 'complete' ? 'authent__buttons-elem' : 'authent__buttons-elem selected'}
              onClick={onCompletedClick}
            >
              Completed
            </div>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
            jsx-a11y/no-static-element-interactions */}
            <div
              className={page !== 'progress' ? 'authent__buttons-elem' : 'authent__buttons-elem selected'}
              onClick={onProgressClick}
            >
              In progress
            </div>
          </div>
          <AuthenticTableBlock var={someVar} />
        </div>
      </PersonalAreaLayout>
    </div>
  );
};
