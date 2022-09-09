import "./AuthenticTableBlock.scss";
import cn from 'classnames'
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SvgSelector from "../../../common/icons/SvgSelector";
import BlockComponentLayout from "../../BlockComponentLayout/BlockComponentLayout";


const AuthenticTableBlock = () => {
  const {pathname} = useLocation()
  console.log(pathname)
  const [searchValue, setSearchValue] = useState()
  const [titleTable, setTitleTable] = useState("")

  useEffect(() => {
    if (pathname === '/dashboard') {
      setTitleTable("In progress authentications")
    }
  }, [])

  const handleSearch = () => {
    alert("клик по кнопке поиска")
  }
  const handleFilter = () => {
    alert("что-то должно произойти при потере фокуса")
  }

  return (
    <BlockComponentLayout>
      <>
        <div className="authent-table__navigaton">
          <div className="authent-table__navigaton__label">{titleTable}</div>
          <input
            className="authent-table__navigaton__search"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
            onBlur={handleSearch}
          />
          <div className="authent-table__navigaton__filter" onClick={handleFilter}>
            <SvgSelector id="filter-icon" />
          </div>
        </div>
        
      </>
    </BlockComponentLayout>
  );
};

export default AuthenticTableBlock;
