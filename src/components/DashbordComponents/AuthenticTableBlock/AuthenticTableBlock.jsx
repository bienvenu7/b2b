import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import moment from 'moment/moment';
import { SvgSelector } from '../../../common/icons/SvgSelector';
import './AuthenticTableBlock.scss';
import {
  getTypesOfProduct,
  takeBrandsList,
  takeCheckStatuses,
  takeProducts,
  takeResultStatuses,
} from '../../../redux/selectors/product-selectors';
import { addCertificateThunk, getBrandsListThunk, getProductsThunk } from '../../../redux/thunks/product-thunk';
import { setProducts } from '../../../redux/reducers/product-reducer';
import { FilterSelect } from '../../PersonalArea/Authentications/FilterSelect';
import { Loader } from '../../Loader/Loader';
import { BlockComponentLayout } from '../../BlockComponentLayout/BlockComponentLayout';
import { Paginator } from '../../Paginator/Paginator';

const PageSize = 8;

export const AuthenticTableBlock = ({ var: someVar }) => {
  // TODO //там есть вторая версия этой таблицы, эту трогать не нужно.
  const location = useLocation();
  const products = useSelector(takeProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const brandsList = useSelector(takeBrandsList);
  const productTypes = useSelector(getTypesOfProduct);
  const checkStatuses = useSelector(takeCheckStatuses);
  const [secondSelectIndex, setSecondSelectIndex] = useState(0);
  const [options, setOptions] = useState();
  const [filterMode, setFilterMode] = useState(false);
  const [filterValues, setFilterValues] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [, setModelNameValue] = useState(null);
  const resultStatuses = useSelector(takeResultStatuses);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [page, setPage] = useState(null);
  const [dataFilter, setDataFilter] = useState({});
  const [sortData, setSortData] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return products && products.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, products]);

  useEffect(() => {
    setPage(someVar === 'completed' ? 'complete' : 'progress');
  });

  useEffect(() => {
    resultStatuses !== null && Object.keys(dataFilter).length > 0 && dispatch(getProductsThunk(dataFilter));
  }, [dataFilter]);

  useEffect(() => {
    !brandsList && dispatch(getBrandsListThunk());
    return () => {
      dispatch(setProducts(null));
    };
  }, []);

  useEffect(() => {
    products && location.state && location.state.page && setCurrentPage(location.state.page);
  }, [products]);

  const handleFilter = () => {
    setFilterMode(!filterMode);
    !filterValues && setFilterValues([{ value: '', secondValue: '' }]);
    if (filterValues) {
      setFilterValues(null);
      setSelectedFilter(null);
      delete dataFilter.productType;
      setDataFilter({ ...dataFilter });
    }
  };

  const onCompletedClick = () => {
    setSortData(true);
    navigate('/authentications/completed');
    const data = {
      resultStatuses: [resultStatuses && resultStatuses.filter((el) => el.name === 'COMPLETED')[0]],
      sort: 'createdAt:DESC',
    };
    dispatch(setProducts(null));
    dispatch(getProductsThunk(data)); //
    filterMode && handleFilter();
  };

  function onProgressClick() {
    navigate('/authentications/in-progress');
    const data = {
      sort: 'createdAt:DESC',
      resultStatuses: resultStatuses.filter((el) => el.name !== 'COMPLETED'),
    };
    dispatch(setProducts(null));
    dispatch(getProductsThunk(data));
    filterMode && handleFilter();
  }

  const handleSort = (sort) => {
    setSortData(!sortData);
    dispatch(
      getProductsThunk({
        ...dataFilter,
        sort: `createdAt:${!sort ? 'DESC' : 'ASC'}`,
      }),
    );
  };

  function handleSearch() {
    dispatch(getProductsThunk(searchValue !== '' ? { ...dataFilter, search: searchValue } : dataFilter));
  }

  function getPhotoUrl(files) {
    try {
      if (files.length === 0) return '';
      return files[0].path;
    } catch (err) {
      return '';
    }
  }

  async function addCertificate(el) {
    const response = await dispatch(addCertificateThunk(el));
    !response && navigate('../payment');
  }

  // eslint-disable-next-line no-empty-function
  useEffect(() => {}, [currentTableData]);

  useEffect(() => {
    selectedFilter && selectedFilter[0].value === 'CATEGORY'
      ? productTypes.length > 0 &&
        setOptions(productTypes.map((el) => (el.publicName ? { label: el.publicName, value: el } : el)))
      : selectedFilter && selectedFilter[0].value === 'OUTCOME' && checkStatuses && setOptions(checkStatuses);
  }, [selectedFilter]);

  function handleChange(e, idx) {
    setOptions();
    setSecondSelectIndex(secondSelectIndex + 1);
    setModelNameValue(null);
    setFilterValues([{ value: '', secondValue: '' }]);
    if (selectedFilter == null) {
      const arr = [];
      for (let i = 0; i <= idx; i++) {
        i === idx ? arr.push(e) : arr.push({ value: '', label: '' });
      }
      setSelectedFilter(arr);
    } else if (idx < selectedFilter.length) {
      setSelectedFilter(selectedFilter.map((el, index) => (index === idx ? (el = e) : el)));
    } else {
      setSelectedFilter([...selectedFilter, e]);
    }
    setFilterValues(filterValues.map((el, index) => (index === idx ? { ...el, value: e.value } : el)));
  }

  function filterData(elem) {
    switch (elem.value) {
      case 'CATEGORY':
        return { ...dataFilter, productType: elem.secondValue.value };
      case 'OUTCOME':
        return { ...dataFilter, checkStatus: elem.secondValue.value };
      case 'MODEL':
        return { ...dataFilter, search: elem.secondValue.value };
      default:
        break;
    }
  }

  function subHandleChange(el) {
    setFilterValues([{ ...filterValues[0], secondValue: el }]);
    dispatch(getProductsThunk(filterData({ ...filterValues[0], secondValue: el })));
  }

  const mainOptions = [
    { value: 'BRAND', label: 'Brand name' },
    { value: 'MODEL', label: 'Model name' },
    { value: 'CATEGORY', label: 'Item category' },
    { value: 'OUTCOME', label: 'Outcome' },
    { value: 'LAST_UPDATE', label: 'Last update' },
  ];

  //

  function getCertificateLink(product) {
    const file = product.files.find((el) => el.feature === 'certificate');
    return file.path;
  }

  const dataFixed = () => moment().format('DD/MM/YYYY');

  useEffect(() => {
    searchValue && searchValue !== ''
      ? setDataFilter({
          ...dataFilter,
          sort: `createdAt:${sortData ? 'DESC' : 'ASC'}`,
          resultStatuses:
            resultStatuses &&
            resultStatuses.filter((el) => (page === 'progress' ? el.name !== 'COMPLETED' : el.name === 'COMPLETED')),
          search: searchValue,
        })
      : setDataFilter({
          ...dataFilter,
          sort: `createdAt:${sortData ? 'DESC' : 'ASC'}`,
          resultStatuses:
            resultStatuses &&
            resultStatuses.filter((el) => (page === 'progress' ? el.name !== 'COMPLETED' : el.name === 'COMPLETED')),
        });
  }, [resultStatuses, searchValue, page]);

  useEffect(() => {
    setDataFilter({
      ...dataFilter,
      sort: `createdAt:${sortData ? 'DESC' : 'ASC'}`,
      resultStatuses:
        resultStatuses &&
        resultStatuses.filter((el) => (page === 'progress' ? el.name !== 'COMPLETED' : el.name === 'COMPLETED')),
    });
  }, []);

  params.page === 'photo-requests' && navigate('../luxury-store/authentications/photo-requests');

  if (page == null) {
    return <div />;
  }
  return (
    <BlockComponentLayout>
      <div
        className="authent__nav-wrapper"
        style={window.location.pathname === '/dashboard' ? { marginTop: '-15px' } : { marginTop: '0px' }}
      >
        <div className="authent__nav-sort">
          <SvgSelector id="sort-icon" />
        </div>
        {page === 'progress' ? (
          <div className="authent__nav-label">In progress authentications</div>
        ) : (
          <div className="authent__nav-label">Completed authentications</div>
        )}
        <div className="authent__nav-search_icon">
          <SvgSelector id="search-icon" onClick={handleSearch} />
        </div>
        <input
          className="authent__nav-search"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search"
          onBlur={handleSearch}
        />
        <div className="authent__nav__buttons-wrapper">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
            jsx-a11y/no-static-element-interactions */}
          <div className="authent__nav__buttons__elem-wrapper" onClick={handleFilter}>
            <SvgSelector id="filter-icon" />
          </div>
        </div>
      </div>
      {filterMode && (
        <div className="authent__filter-wrapper">
          <div className="authent__filter__elems-wrapper">
            {filterValues &&
              filterValues.map((el, index) => (
                <div key={index} className="authent__filter__elem">
                  <FilterSelect
                    key={index}
                    index={index}
                    mainOptions={mainOptions}
                    handleChange={handleChange}
                    length={filterValues.length}
                  />
                  {selectedFilter &&
                  selectedFilter[index] &&
                  selectedFilter[index].value &&
                  selectedFilter[index].value === 'MODEL' ? (
                    <input
                      type="text"
                      placeholder="model"
                      onChange={setModelNameValue}
                      onBlur={(e) => subHandleChange({ value: e.target.value })}
                    />
                  ) : (
                    selectedFilter && (
                      <Select
                        key={secondSelectIndex}
                        onChange={subHandleChange}
                        classNamePrefix="custom-select__dashboard"
                        placeholder="Select filter"
                        options={options && options}
                      />
                    )
                  )}
                </div>
              ))}
            <button
              onClick={() => {
                setSelectedFilter(null);
                handleFilter();
              }}
            >
              Clear
            </button>
          </div>
        </div>
      )}
      {window.location.pathname !== '/dashboard' && (
        <div className="authent__buttons-wrapper mobile">
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
      )}

      {page === 'complete' && (
        <div className="authent__table">
          <div className="authent__table__label-wrapper">
            <div className="authent__table__label__elems-wrapper">
              <div className="authent__table__label__elem-checkbox">
                <input type="checkbox" className="custom-checkbox__table" id="check" />
                <label htmlFor="check" />
              </div>
              <div className="authent__table__label__elem-category">Item category</div>
              <div className="authent__table__label__elems-brand">Brand</div>
              <div className="authent__table__label__elems-model">Model name</div>
              <div className="authent__table__label__elems-outcome">Outcome</div>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
                jsx-a11y/no-static-element-interactions */}
              <div
                className={`authent__table__label__elems-date${!sortData ? ' arrow-up' : ''}`}
                onClick={() => handleSort(sortData)}
              >
                Submission date <SvgSelector id="down-arrow-icon" />
              </div>
              <div className="authent__table__label__elems-pdf">Pdf certificate</div>
            </div>
          </div>
          {/* eslint-disable-next-line no-nested-ternary */}
          {currentTableData == null ? (
            <Loader />
          ) : currentTableData.length > 0 ? (
            currentTableData.map((el, index) => (
              <div key={index} className="authent__table__elem">
                <div className="authent__table__elems-wrapper">
                  <div className="authent__table__elem-checkbox">
                    <input
                      key={index}
                      type="checkbox"
                      className="custom-checkbox__table"
                      id={`check-for-elem-${index}`}
                    />
                    <label htmlFor={`check-for-elem-${index}`} />
                  </div>
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
                    jsx-a11y/no-static-element-interactions */}
                  <div
                    className="authent__table__elem__category"
                    onClick={() =>
                      navigate(`/request/${el.id}`, {
                        state: { page: currentPage, var: page },
                      })
                    }
                  >
                    <div
                      className="authent__table__elem__category-image"
                      style={{
                        background: `url(${getPhotoUrl(el.files)})`,
                      }}
                    />
                    <div className="authent__table__elem__category-label">{el.productType.publicName}</div>
                    <div className="authent__table__elem__category-number">#{el.publicId}</div>
                    <div className="authent__table__elem__category-date">{dataFixed(el.createdAt, 'mobile')}</div>
                  </div>
                  <div className="authent__table__elem-brand">{el.brand.publicName}</div>
                  <div className="authent__table__elem-model">{el.modelName}</div>
                  <div className="authent__table__elem-outcome">{el.checkStatus}</div>
                  <div className="authent__table__elem-date">{dataFixed(el.createdAt, 'desktop')}</div>
                  {el.certificateAvailable ? (
                    <a className="authent__table__elem-pdf" href={getCertificateLink(el)}>
                      View
                    </a>
                  ) : (
                    /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
                  jsx-a11y/no-static-element-interactions */
                    <div className="authent__table__elem-pdf" onClick={() => addCertificate(el)}>
                      Add
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <span className="noorders">No authentications yet</span>
          )}
        </div>
      )}

      {page !== 'complete' && (
        <div className="authent__table">
          <div className="authent__table__label-wrapper">
            <div className="authent__table__label__elems-wrapper">
              <div className="authent__table__label__elem-category">Item category</div>
            </div>
            <div className="authent__table__label__elems-wrapper">
              <div className="authent__table__label__elems-brand">Brand</div>
              <div className="authent__table__label__elems-model">Model name</div>
              <div className="authent__table__label__elems-status">Status</div>
              <div className="authent__table__label__elems-answer">Answer time</div>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
                jsx-a11y/no-static-element-interactions */}
              <div
                className={`authent__table__label__elems-date${!sortData ? ' arrow-up' : ''}`}
                onClick={() => handleSort(sortData)}
              >
                Submission date <SvgSelector id="down-arrow-icon" />
              </div>
            </div>
          </div>
          {currentTableData ? (
            currentTableData.map((el, index) => (
              <div key={index} className="authent__table__elem">
                <div className="authent__table__elems-wrapper">
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
                    jsx-a11y/no-static-element-interactions */}
                  <div
                    className="authent__table__elem__category"
                    onClick={() =>
                      navigate(`../request/${el.id}`, {
                        state: { page: currentPage, var: page },
                      })
                    }
                  >
                    <div
                      className="authent__table__elem__category-image"
                      style={{
                        background: `url(${getPhotoUrl(el.files)})`,
                      }}
                    />
                    <div className="authent__table__elem__category-label">{el.productType.publicName}</div>
                    <div className="authent__table__elem__category-number">#{el.publicId}</div>
                    <div className="authent__table__elem__category-date">{dataFixed(el.createdAt, 'mobile')}</div>
                  </div>
                  <div className="authent__table__elem-brand">{el.brand.publicName}</div>
                  <div className="authent__table__elem-model">{el.modelName}</div>
                  <div className="authent__table__elem-status">{el.resultStatus.publicName}</div>
                  <div className="authent__table__elem-answer">{el.answerTime} hours</div>
                  <div className="authent__table__elem-date">
                    {`${new Date(el.createdAt).getDate()}/${Number(new Date(el.createdAt).getMonth()) + 1}/${new Date(
                      el.createdAt,
                    ).getFullYear()}`}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Loader />
          )}
        </div>
      )}
      {products && currentTableData && (
        <Paginator
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={products.length}
          PageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </BlockComponentLayout>
  );
};
