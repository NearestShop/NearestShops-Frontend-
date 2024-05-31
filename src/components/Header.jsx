import { useAppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";

import SideMenu from "./SideMenu";
import Cart from "./Cart";
import SearchBar from "./SearchBar";

import logo from "/assets/logo.png";

const Header = () => {
  const { userData } = useAppContext();
  return (
    <header className="flex items-center justify-between py-4 px-4 lg:px-8 text-lg shadow">
      <SideMenu />
      <div className="max-w-[100px]">
        <Link to="/">
          <img src={logo} className="h-[50px] md:h-[80px]" alt="logo" />
        </Link>
      </div>
      <nav className="hidden lg:flex">
        <ul className="flex items-center gap-4">
          <li className="hover:text-secondary duration-200">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-secondary duration-200">
            <Link to="/collection">Collection</Link>
          </li>
          <li className="hover:text-secondary duration-200">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-secondary duration-200">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        <SearchBar />
        {userData.loggedIn ? (
          <>
            <Cart />
            <Link to="/profile" className="hidden lg:block hover:text-secondary duration-200">
              {userData.name}
            </Link>
          </>
        ) : (
          <Link to="/login" className="hidden lg:block hover:text-secondary duration-200">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
