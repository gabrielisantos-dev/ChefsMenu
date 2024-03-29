import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom/cjs/react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import mealIcon from '../images/mealIcon.svg';
import chefmenu from '../images/chefsmenu.png';
import cheflogo from '../images/cheflogo.svg';
import '../index.css';

function Header() {
  const [renderSearchBtn, setRenderSearchBtn] = useState(false);
  const [renderSearchInput, setRenderSearchInput] = useState(false);

  const location = useLocation();
  const [title] = useState(location.pathname.split('/')[1]);

  useEffect(() => {
    switch (location.pathname) {
    case '/meals':
      setRenderSearchBtn(true);
      break;
    case '/drinks':
      setRenderSearchBtn(true);
      break;
    case '/profile':
      setRenderSearchBtn(false);
      break;
    case '/done-recipes':
      setRenderSearchBtn(false);
      break;
    case '/favorite-recipes':
      setRenderSearchBtn(false);
      break;
    default:
      setRenderSearchBtn(false);
    }
  }, [location.pathname]);

  return (
    <header>

      <div className="container-header">
        <Link to="/meals">
          <div className="flex items-center">
            <img src={ cheflogo } alt="chef logo" className="chef-logo" />
            <img src={ chefmenu } alt="title" className="menu-logo" />
          </div>
        </Link>

        <div className="flex items-center">
          <button
            type="button"
            onClick={ () => setRenderSearchInput(!renderSearchInput) }
            className="mr-6"
          >
            {
              renderSearchBtn
        && <img
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="Search"
          className="w-7 focus:outline-none"
        />
            }
          </button>

          <Link to="/profile">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="Profile"
              className="w-7 focus:outline-none"
            />
          </Link>
        </div>
      </div>

      {
        (title === 'meals' || title === 'drinks') && (
          <div className="flex-col-center mt-9 mb-6">
            <img src={ mealIcon } alt="meal icon" className="w-14 md:w-20" />
            <h1 className="title-meals">{title}</h1>
          </div>
        )
      }

      { renderSearchInput && (
        <SearchBar />
      )}

    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
