import "./AuthenticTableBlock.scss";
import cn from "classnames";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SvgSelector from "../../../common/icons/SvgSelector";
import BlockComponentLayout from "../../BlockComponentLayout/BlockComponentLayout";

const AuthenticTableBlock = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  const [searchValue, setSearchValue] = useState();
  const [filterValues, setFilterValues] = useState(null);
  const [titleTable, setTitleTable] = useState("");
  const [isFilter, setIsFilter] = useState(false);

  const mainOptions = [
    { value: "BRAND", label: "Brand name" },
    { value: "MODEL", label: "Model name" },
    { value: "CATEGORY", label: "Item category" },
    { value: "OUTCOME", label: "Outcome" },
    { value: "LAST_UPDATE", label: "Last update" },
  ];

  useEffect(() => {
    if (pathname === "/dashboard") {
      setTitleTable("In progress authentications");
    }
  }, []);

  const handleSearch = () => {
    alert("клик по кнопке поиска");
  };
  const handleFilter = () => {
    setIsFilter(!isFilter);
  };

  return (
    <BlockComponentLayout>
      <>
        <div className="authent-table__navigaton">
          <div className="authent-table__navigaton__label">{titleTable}</div>
          <input
            className="authent-table__navigaton__search"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
            // onBlur={handleSearch}
          />
          <div
            className="authent-table__navigaton__filter-btn"
            onClick={handleFilter}
          >
            <SvgSelector id="filter-icon" />
          </div>
        </div>
        <div className={cn("authent-table__filter-wrapper", {
          visible: isFilter
        })}>
          <div className="authent-table__filter-wrapper__elements ">
            {/* {filterValues &&
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
              ))} */}
            <button
              className="authent-table__filter-wrapper__button"
              onClick={() => {
                // setSelectedFilter(null);
                handleFilter();
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </>
    </BlockComponentLayout>
  );
};

export default AuthenticTableBlock;
