import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function RecommendationsCard({ recipes }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };
  const maxRecommendations = 6;

  return (
    <Slider { ...settings }>
      {recipes.length > 0
        && recipes
          .filter((recipe, index) => index < maxRecommendations)
          .map((recommendation, index) => (
            <div
              key={ recommendation.idDrink || recommendation.idMeal }
              data-testid={ `${index}-recommendation-card` }
            >
              <img
                src={ recommendation.strDrinkThumb || recommendation.strMealThumb }
                alt={ recommendation.strDrink || recommendation.strMeal }
                className="w-[8.438rem] rounded-md"
              />
              <h3 className="w-[8.438rem]">
                {recommendation.strDrink || recommendation.strMeal}
              </h3>
            </div>
          ))}
    </Slider>
  );
}

const drinkPropType = PropTypes.shape({
  idDrink: PropTypes.string.isRequired,
  strDrink: PropTypes.string.isRequired,
  strDrinkThumb: PropTypes.string.isRequired,
});

const mealPropType = PropTypes.shape({
  idMeal: PropTypes.string.isRequired,
  strMeal: PropTypes.string.isRequired,
  strMealThumb: PropTypes.string.isRequired,
});

RecommendationsCard.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.oneOfType([drinkPropType, mealPropType]))
    .isRequired,
};

export default RecommendationsCard;
