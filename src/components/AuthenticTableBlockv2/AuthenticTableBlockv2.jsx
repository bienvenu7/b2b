import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import moment from 'moment/moment';
import { SvgSelector } from '../../common/icons/SvgSelector';
import './AuthenticTableBlock.scss';
import {
  getTypesOfProduct,
  takeBrandsList,
  takeCheckStatuses,
  takeProducts,
  takeResultStatuses,
} from '../../redux/selectors/product-selectors';
import { addCertificateThunk, getBrandsListThunk, getProductsThunk } from '../../redux/thunks/product-thunk';
import { setProducts } from '../../redux/reducers/product-reducer';
import { FilterSelect } from '../PersonalArea/Authentications/FilterSelect';
import { Loader } from '../Loader/Loader';
import { BlockComponentLayout } from '../BlockComponentLayout/BlockComponentLayout';
import { Paginator } from '../Paginator/Paginator';

const PageSize = 8;

export const AuthenticTableBlock = ({ var: someVar,headers,myproducts,typeoftable }) => {
    console.log({products:myproducts});
  const location = useLocation();
  const products =null;
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
    return myproducts && myproducts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, myproducts]);

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
      page: currentPage,
      limit:PageSize
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
      page: currentPage,
      limit:PageSize
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
    !response && navigate('payment');
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

  params.page === 'photo-requests' && navigate('luxury-store/authentications/photo-requests');

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

{page !== 'complete' && (
    <>
        <table className='authent__table'>
          <thead>
            <tr>
                {headers.map((el,i)=>{
                    return <th>{el}</th> 
                })}
            </tr>
            </thead>
            <tbody>
            
            
          {currentTableData ? (
            currentTableData.map((el, index) => (
            <>
              {typeoftable == 'orders' && <tr>
                <td
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
                        backgroundPosition: 'center'
                      }}
                    />
                    <div className="authent__table__elem__category-label">{el.productType.publicName}</div>
                    <div className="authent__table__elem__category-number">#{el.publicId}</div>
                    <div className="authent__table__elem__category-date">{dataFixed(el.createdAt, 'mobile')}</div>
                  </td>
                <td>{el.brand.publicName}</td>
                <td>{el.modelName}</td>
                <td>{el.resultStatus.publicName}</td>
                <td>{el.answerTime} hours</td>
                <td>{`${new Date(el.createdAt).getDate()}/${Number(new Date(el.createdAt).getMonth()) + 1}/${new Date(
                      el.createdAt,
                     ).getFullYear()}`}</td>
            </tr>}
            {typeoftable == 'pricing' && <tr>
              <td>{el.name}</td>
              <td>{el.count}</td>
              <td>{el.date}</td>
              <td>Edit</td>
              </tr>}
            </>
            ))
          ) : (
            <Loader />
          )}
          </tbody>
        </table>
        </>
      )}
      {myproducts && currentTableData && (
        <Paginator
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={myproducts.length}
          PageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </BlockComponentLayout>
  );
};
