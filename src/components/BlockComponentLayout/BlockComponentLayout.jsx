import React, { useEffect, useState } from 'react';
import './BlockComponentLayout.scss';

export const BlockComponentLayout = ({ children }) => {
  const [, setSize] = useState(false);

  useEffect(() => {
    window.innerWidth <= 520 && setSize(true);
  }, []);

  return <div className={window.location.pathname === '/dashboard' ? 'block' : 'block resize'}>{children}</div>;
};
