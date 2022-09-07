import "./Auth.scss";
import logo from "../../common/icons/logo.png";
import background from "../../common/images/auth-background-left.png";

const AuthLayout = ({ children }) => {
  return (
    <>
      <div className="auth-container">
        <div className="auth__background">
          <div
            className="auth__background-left"
            style={{ backgroundImage: `url(${background})` }}
          ></div>
          <div className="auth__background-right"></div>
        </div>
        <div className="auth__main-container">
          <div className="auth__menu">
            <div className="auth__menu-logo">
              <img className="logoImage" src={logo} />
              <div className="title">Business platform</div>
            </div>
            <ul className="auth__menu-buttons">
              <li className="auth__menu-elem">Home page</li>
              <li className="auth__menu-elem">Real vs Fake Guides</li>
              <li className="auth__menu-elem">Reviews</li>
            </ul>
          </div>
          <div className="auth__content-wrapper">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
