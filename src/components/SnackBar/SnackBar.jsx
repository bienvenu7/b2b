import React from 'react';
import { useSnackbar } from 'react-simple-snackbar';
import './SnackBar.css';

export const SnackWarning = ({ error }) => {
  const [openSnackbar] = useSnackbar();

  return (
    /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
                  jsx-a11y/no-static-element-interactions */
    <div onClick={() => (error === true ? openSnackbar('This is the content of the Snackbar.', [4000]) : null)} />
  );
};
