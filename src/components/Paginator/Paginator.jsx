import React from 'react';
import classnames from 'classnames';
import { DOTS, usePagination } from '../../hooks/usePagination';
import './Paginator.scss';

export const Paginator = (props) => {
  // TODO
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={classnames('pagination-container', { [className]: className })}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
      jsx-a11y/no-noninteractive-element-interactions */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index} className="pagination-item dots">
              &#8230;
            </li>
          );
        }

        return (
          /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
      jsx-a11y/no-noninteractive-element-interactions */
          <li
            key={index}
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
      jsx-a11y/no-noninteractive-element-interactions */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};
