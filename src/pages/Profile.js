import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Perfil from '../images/Perfil.svg';
import Group from '../images/Group.svg';
import favorite from '../images/favorite.svg';
import logout from '../images/logout.svg';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const [redirectToRecipes, setRedirectToRecipes] = useState(false);
  const [redirectToFavorites, setRedirectToFavorites] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user ? user.email : '';
    setUserEmail(email);
  }, []);

  const handleDoneRecipesClick = () => {
    setRedirectToRecipes(true);
  };

  const handleFavoriteRecipesClick = () => {
    setRedirectToFavorites(true);
  };

  if (redirectToRecipes) {
    return <Redirect to="/done-recipes" />;
  }

  if (redirectToFavorites) {
    return <Redirect to="/favorite-recipes" />;
  }

  const handleLogoutClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <main
      className="flex flex-col items-center h-screen"
    >
      <div>
        <Header pageTitle="Profile" />
      </div>
      <div className="flex flex-col items-center shadow-lg p-10">
        <img src={ Perfil } alt="Perfil" className="w-7 h-7 mt-8" />

        <h1 className="text-2xl font-bold text-purple-900 mt-3 mb-8">Profile</h1>

        <div className="mb-4 ">
          <span
            data-testid="profile-email"
            className="text-[#1A1B1C] ml-[25px] font-bold"
          >
            {userEmail}

          </span>
        </div>

        <div className="mb-4 flex flex-col items-start ml-14 mt-[61px] mr-10">
          <div className="flex items-center justify-start mb-6">
            <img src={ Group } alt="Group" className="w-[39px] mr-5" />
            <button
              data-testid="profile-done-btn"
              onClick={ handleDoneRecipesClick }
              className="bg-gray-100 hover:bg-yellow-300
            text-[#797D86] rounded-lg text-base"
            >
              Done Recipes
            </button>
          </div>
          <hr className="w-[290px] my-2 border-gray-400" />
          <div className="flex items-center justify-start my-6">
            <img src={ favorite } alt="favorite" className="w-[39px] mr-5" />
            <button
              data-testid="profile-favorite-btn"
              onClick={ handleFavoriteRecipesClick }
              className="bg-gray-100 hover:bg-yellow-300
            text-[#797D86] rounded-lg text-base"
            >
              Favorite Recipes
            </button>
          </div>
          <hr className="w-[290px] my-2 border-gray-400" />
          <div className="flex items-center mt-6">
            <img src={ logout } alt="favorite" className="w-[39px] mr-5" />
            <button
              data-testid="profile-logout-btn"
              onClick={ handleLogoutClick }
              className="bg-gray-100 hover:bg-red-300
            text-[#797D86] rounded-lg text-base"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Profile;
