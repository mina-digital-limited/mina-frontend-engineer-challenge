import { FC } from "react";
import Search from "../Search/Search";
import LogoIcon from "../img/icon-logo.svg";
import { APP_NAME } from "../common/constants";

const Header: FC = () => {
  return (
    <header className="header" data-testid="header">
      <div className="header__container">
        <img className="header__logo" src={LogoIcon} alt="logo" />

        <h1 className="header__title">{APP_NAME}</h1>

        <Search />
      </div>
    </header>
  );
};

export default Header;
