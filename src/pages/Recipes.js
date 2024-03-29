import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';
import Footer from '../components/Footer';

function Recipes() {
  return (
    <main>
      <Switch>
        <Route path="/meals" component={ Meals } />
        <Route path="/drinks" component={ Drinks } />
      </Switch>
      <div>
        <Footer />
      </div>
    </main>
  );
}

export default Recipes;
