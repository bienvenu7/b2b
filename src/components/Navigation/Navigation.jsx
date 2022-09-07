import { useNavigate } from "react-router-dom";
import SvgSelector from "../../common/icons/SvgSelector";
import "./Navigation.scss";

const Navigation = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="header__nav">
        <div className="header__nav__home" onClick={() => navigate("../main")}>
          <SvgSelector id="home" />
        </div>
        {props.hrefs &&
          props.hrefs.map((el, index) => (
            <div key={index} className="header__nav__elem">
              &nbsp;/&nbsp;{el.label}
            </div>
          ))}
      </div>
    </>
  );
};

export default Navigation;
