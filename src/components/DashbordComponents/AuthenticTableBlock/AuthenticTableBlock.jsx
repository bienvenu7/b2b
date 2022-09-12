import React from 'react'
// import PersonalAreaLayout from "../PersonalAreaLayout";
import SvgSelector from "../../../common/icons/SvgSelector";
import "./AuthenticTableBlock.scss";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  getTypesOfProduct,
  takeBrandsList,
  takeCheckStatuses,
  takeProducts,
  takeResultStatuses,
} from "../../../redux/selectors/product-selectors";
import {
  addCertificateThunk,
  getBrandsListThunk,
  getProductsThunk,
} from "../../../redux/thunks/product-thunk";
import { setProducts } from "../../../redux/reducers/product-reducer";
import Paginator from "../../Paginator/Paginator"
import Select from "react-select";
import FilterSelect from '../../PersonalArea/Authentications/FilterSelect'
import Loader from "../../Loader/Loader";
const Authentications = (props) => {
  const location = useLocation();

  const PageSize = 8;

  const products = useSelector(takeProducts);

  //for pagination

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const PageSize = 8;
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return products && products.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, products]);

  //

  const resultStatuses = useSelector(takeResultStatuses);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [page, setPage] = useState(null);

  const [dataFilter, setDataFilter] = useState({});

  // Было
  // useEffect(() => {
  //   setPage(
  //     props.var === "completed"
  //       ? "complete"
  //       : props.var === "progress" && "progress"
  //   );
  // });

  // Стало
  useEffect(() => {
    setPage(
      props.var === "completed"
        ? "complete"
        : "progress"
    );
  });
  console.log(page)

  useEffect(() => {
    resultStatuses !== null &&
      Object.keys(dataFilter).length > 0 &&
      dispatch(getProductsThunk(dataFilter));
    /*dispatch(getProductsThunk(
            {
                resultStatuses: resultStatuses.filter(el => params.page === 'completed' ? el.name === 'COMPLETED' : el.name !== 'COMPLETED'),
                sort: `createdAt:${sortData ? 'DESC' : 'ASC'}`
            }))*/
  }, [dataFilter]);

  useEffect(() => {
    !brandsList && dispatch(getBrandsListThunk());
    return () => {
      dispatch(setProducts(null));
    };
  }, []);

  useEffect(() => {
    products &&
      location.state &&
      location.state.page &&
      setCurrentPage(location.state.page);
  }, [products]);

  const [sortData, setSortData] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  function onCompletedClick() {
    setSortData(true);
    navigate("/authentications/completed");
    const data = {
      resultStatuses: [
        resultStatuses &&
          resultStatuses.filter((el) => el.name === "COMPLETED")[0],
      ],
      sort: "createdAt:DESC",
    };
    dispatch(setProducts(null));
    dispatch(getProductsThunk(data));//
    filterMode && handleFilter();
  }

  function onProgressClick() {
    navigate("/authentications/in-progress");
    const data = {
      sort: "createdAt:DESC",
      resultStatuses: resultStatuses.filter((el) => el.name !== "COMPLETED"),
    };
    dispatch(setProducts(null));
    dispatch(getProductsThunk(data));
    filterMode && handleFilter();
  }

  function handleSort(sort) {
    setSortData(!sortData);
    dispatch(
      getProductsThunk({
        ...dataFilter,
        sort: `createdAt:${!sort ? "DESC" : "ASC"}`,
      })
    );
  }

  function handleSearch() {
    const data = {
      resultStatuses: resultStatuses.filter((el) =>
        page === "progress" ? el.name !== "COMPLETED" : el.name === "COMPLETED"
      ),
    };
    dispatch(
      getProductsThunk(
        searchValue !== "" ? { ...dataFilter, search: searchValue } : dataFilter
      )
    );
  }

  function getPhotoUrl(files) {
    return process.env.NODE_ENV !== "production"
      ? "/mockimage.png"
      : "/assets" + files.length > 0 && files[0].path + "/" + files[0].name;
  }

  async function addCertificate(el) {
    const response = await dispatch(addCertificateThunk(el));
    !response && navigate("../payment");
  }

  useEffect(() => {}, [currentTableData]);

  //for filter

  const brandsList = useSelector(takeBrandsList);
  const productTypes = useSelector(getTypesOfProduct);
  const checkStatuses = useSelector(takeCheckStatuses);

  const [secondSelectIndex, setSecondSelectIndex] = useState(0);

  const [options, setOptions] = useState();

  const [filterMode, setFilterMode] = useState(false);

  const [filterValues, setFilterValues] = useState(null);

  const [selectedFilter, setSelectedFilter] = useState(null);

  const [modelNameValue, setModelNameValue] = useState(null);

  function handleFilter() {
    setFilterMode(!filterMode);
    !filterValues && setFilterValues([{ value: "", secondValue: "" }]);
    if (filterValues) {
      setFilterValues(null);
      setSelectedFilter(null);
      delete dataFilter.productType;
      setDataFilter({ ...dataFilter });
    } else {
    }
  }

  useEffect(() => {
    selectedFilter && selectedFilter[0].value === "CATEGORY"
      ? productTypes.length > 0 &&
        setOptions(
          productTypes.map((el, index) =>
            el.publicName ? { label: el.publicName, value: el } : el
          )
        )
      : selectedFilter &&
        selectedFilter[0].value === "OUTCOME" &&
        checkStatuses &&
        setOptions(checkStatuses);
  }, [selectedFilter]);

  function handleChange(e, idx, length) {
    setOptions();
    setSecondSelectIndex(secondSelectIndex + 1);
    setModelNameValue(null);
    setFilterValues([{ value: "", secondValue: "" }]);
    if (selectedFilter === null) {
      let arr = [];
      for (let i = 0; i <= idx; i++) {
        i === idx ? arr.push(e) : arr.push({ value: "", label: "" });
      }
      setSelectedFilter(arr);
    } else {
      if (idx < selectedFilter.length) {
        setSelectedFilter(
          selectedFilter.map((el, index) => (index === idx ? (el = e) : el))
        );
      } else {
        setSelectedFilter([...selectedFilter, e]);
      }
    }
    setFilterValues(
      filterValues.map((el, index) =>
        index === idx ? { ...el, value: e.value } : el
      )
    );
  }

  function filterData(elem) {
    const data = {
      resultStatuses: resultStatuses.filter((el) =>
        page === "progress" ? el.name !== "COMPLETED" : el.name === "COMPLETED"
      ),
    };
    switch (elem.value) {
      case "CATEGORY":
        return { ...dataFilter, productType: elem.secondValue.value };
      case "OUTCOME":
        return { ...dataFilter, checkStatus: elem.secondValue.value };
      case "MODEL":
        return { ...dataFilter, search: elem.secondValue.value };
      default:
        break;
    }
  }

  function subHandleChange(el) {
    setFilterValues([{ ...filterValues[0], secondValue: el }]);
    dispatch(
      getProductsThunk(filterData({ ...filterValues[0], secondValue: el }))
    );
  }

  const mainOptions = [
    { value: "BRAND", label: "Brand name" },
    { value: "MODEL", label: "Model name" },
    { value: "CATEGORY", label: "Item category" },
    { value: "OUTCOME", label: "Outcome" },
    { value: "LAST_UPDATE", label: "Last update" },
  ];

  //

  function getCertificateLink(product) {
    const file = product.files.find((el) => el.feature === "certificate");
    if (process.env.NODE_ENV !== "production") {
      return "/app/files";
    } else {
      return file.path + "/" + file.name;
    }
  }

  function getDate(data, version) {
    const date = new Date(data);
    if (version === "desktop") {
      return (
        date.getDate() +
        "/" +
        Number(date.getMonth() + 1) +
        "/" +
        date.getFullYear()
      );
    } else if (version === "mobile") {
      return (
        date.getHours() +
        ":" +
        date.getMinutes() +
        "·" +
        date.getDate() +
        "/" +
        Number(date.getMonth() + 1) +
        "/" +
        date.getFullYear()
      );
    }
  }

  useEffect(() => {
    searchValue && searchValue !== ""
      ? setDataFilter({
          ...dataFilter,
          sort: `createdAt:${sortData ? "DESC" : "ASC"}`,
          resultStatuses:
            resultStatuses &&
            resultStatuses.filter((el) =>
              page === "progress"
                ? el.name !== "COMPLETED"
                : el.name === "COMPLETED"
            ),
          search: searchValue,
        })
      : setDataFilter({
          ...dataFilter,
          sort: `createdAt:${sortData ? "DESC" : "ASC"}`,
          resultStatuses:
            resultStatuses &&
            resultStatuses.filter((el) =>
              page === "progress"
                ? el.name !== "COMPLETED"
                : el.name === "COMPLETED"
            ),
        });
  }, [resultStatuses, searchValue, page]);

  useEffect(() => {
    setDataFilter({
      ...dataFilter,
      sort: `createdAt:${sortData ? "DESC" : "ASC"}`,
      resultStatuses:
        resultStatuses &&
        resultStatuses.filter((el) =>
          page === "progress"
            ? el.name !== "COMPLETED"
            : el.name === "COMPLETED"
        ),
    });
  }, []);

  params.page === "photo-requests" &&
    navigate("../luxury-store/authentications/photo-requests");

  if (page === null) {
    return <div>Хйуня</div>;
  } else {
    return (
      
          <div className="authent-container">
            {/* <div className="authent__buttons-wrapper desktop">
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
            </div> */}
            <div className="authent-wrapper">
              <div className="authent__nav-wrapper">
                <div className="authent__nav-sort">
                  <SvgSelector id="sort-icon" />
                </div>
                {page === "progress" ? (
                  <div className="authent__nav-label">
                    In progress authentications
                  </div>
                ) : (
                  <div className="authent__nav-label">
                    Completed authentications
                  </div>
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
                  <div
                    className="authent__nav__buttons__elem-wrapper"
                    onClick={handleFilter}
                  >
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
                          selectedFilter[index].value === "MODEL" ? (
                            <input
                              type="text"
                              placeholder="model"
                              onChange={setModelNameValue}
                              onBlur={(e) =>
                                subHandleChange({ value: e.target.value })
                              }
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
                          {/*filterValues[index]&&filterValues[index].value !== '' &&<button className="authent__filter__elem-button" onClick={() => filterValues && setFilterValues([...filterValues, { value: '', secondValue: '' }])}>add</button>*/}
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

              {/* mobile buttons */}
              <div className="authent__buttons-wrapper mobile">
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

              {page === "complete" && (
                <div className="authent__table">
                  <div className="authent__table__label-wrapper">
                    <div className="authent__table__label__elems-wrapper">
                      <div className="authent__table__label__elem-checkbox">
                        <input
                          type="checkbox"
                          className="custom-checkbox__table"
                          id="check"
                        />
                        <label htmlFor="check" />
                      </div>
                      <div className="authent__table__label__elem-category">
                        Item category
                      </div>
                    </div>
                    <div className="authent__table__label__elems-wrapper">
                      <div className="authent__table__label__elems-brand">
                        Brand
                      </div>
                      <div className="authent__table__label__elems-model">
                        Model name
                      </div>
                      <div className="authent__table__label__elems-outcome">
                        Outcome
                      </div>
                      <div
                        className={`authent__table__label__elems-date${
                          !sortData ? " arrow-up" : ""
                        }`}
                        onClick={() => handleSort(sortData)}
                      >
                        Submission date <SvgSelector id="down-arrow-icon" />
                      </div>
                      <div className="authent__table__label__elems-pdf">
                        Pdf certificate
                      </div>
                    </div>
                  </div>
                  {currentTableData ? (
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
                            >
                              {/*<img src={el.image} alt="" />*/}
                            </div>
                            <div className="authent__table__elem__category-label">
                              {el.productType.publicName}
                            </div>
                            <div className="authent__table__elem__category-number">
                              #{el.publicId}
                            </div>
                            <div className="authent__table__elem__category-date">
                              {getDate(el.createdAt, "mobile")}
                            </div>
                          </div>
                        </div>
                        <div className="authent__table__elems-wrapper">
                          <div className="authent__table__elem-brand">
                            {el.brand.publicName}
                          </div>
                          <div className="authent__table__elem-model">
                            {el.modelName}
                          </div>
                          <div className="authent__table__elem-outcome">
                            {el.checkStatus}
                          </div>
                          <div className="authent__table__elem-date">
                            {getDate(el.createdAt, "desktop")}
                          </div>
                          {el.certificateAvailable ? (
                            <a
                              className="authent__table__elem-pdf"
                              href={getCertificateLink(el)}
                            >
                              View
                            </a>
                          ) : (
                            <div
                              className="authent__table__elem-pdf"
                              onClick={() => addCertificate(el)}
                            >
                              Add
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <Loader />
                  )}
                </div>
              )}

              {page !== "complete" && (
                <div className="authent__table">
                  <div className="authent__table__label-wrapper">
                    <div className="authent__table__label__elems-wrapper">
                      <div className="authent__table__label__elem-category">
                        Item category
                      </div>
                    </div>
                    <div className="authent__table__label__elems-wrapper">
                      <div className="authent__table__label__elems-brand">
                        Brand
                      </div>
                      <div className="authent__table__label__elems-model">
                        Model name
                      </div>
                      <div className="authent__table__label__elems-status">
                        Status
                      </div>
                      <div className="authent__table__label__elems-answer">
                        Answer time
                      </div>
                      <div
                        className={`authent__table__label__elems-date${
                          !sortData ? " arrow-up" : ""
                        }`}
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
                            >
                              {/*<img src={el.image} alt="" />*/}
                            </div>
                            <div className="authent__table__elem__category-label">
                              {el.productType.publicName}
                            </div>
                            <div className="authent__table__elem__category-number">
                              #{el.publicId}
                            </div>
                            <div className="authent__table__elem__category-date">
                              {getDate(el.createdAt, "mobile")}
                            </div>
                          </div>
                        </div>
                        <div className="authent__table__elems-wrapper">
                          <div className="authent__table__elem-brand">
                            {el.brand.publicName}
                          </div>
                          <div className="authent__table__elem-model">
                            {el.modelName}
                          </div>
                          <div className="authent__table__elem-status">
                            {el.resultStatus.publicName}
                          </div>
                          <div className="authent__table__elem-answer">
                            {el.answerTime} hours
                          </div>
                          <div className="authent__table__elem-date">
                            {new Date(el.createdAt).getDate() +
                              "/" +
                              (Number(new Date(el.createdAt).getMonth()) + 1) +
                              "/" +
                              new Date(el.createdAt).getFullYear()}
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
                  pageSize={PageSize}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              )}
            </div>
          </div>
    );
  }
};

export default Authentications;
