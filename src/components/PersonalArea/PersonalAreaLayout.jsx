import React from 'react';
import { Header } from '../Header/Header';
import { Dashboard } from './Dashboard/Dashboard';
import './PersonalAreaLayout.scss';

export const PersonalAreaLayout = ({ children }) => {
  return (
    <div className="personal_area-container">
      <Header />
      <div className="content-wrapper">
        <input type="checkbox" id="dashboard-open" className="hidden-menu-ticker" />
        <Dashboard />
        {children}
      </div>
    </div>
  );
};
