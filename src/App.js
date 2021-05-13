import React, { useState, useEffect } from 'react';
import './css/App.css';
import './css/Products.css';
import axios from 'axios';
import {Oval} from 'react-loading-icons'
import Navigation from './Components/Navigation';
import Products from './Components/Products';
import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom';
import ProductsDetails from './Components/ProductsDetails';

export default function App() {
  
  /*
  Déclaration d'une variable d'état, que l'on va appeler « productsData »
  son état démarre avec un tableau vide
  */
  const [error, setError] = useState(null);
  const [productsData, setProductsData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const updatePrice = (id, price) => {
    setProductsData((productsData) =>
    // cette fonction va créer un nouveau tableau avec les données de l'API (l'ID et le prix) 
      productsData.map((product) =>
        product.id === Number(id)
          ? {
              ...product,
              price: Number(price)
            }
          : product
      )
    );
};

  // utilisation du Hook useEffect qui va nous servir a récupérer les données de l'API "fake store API"
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products?limit=7").then((res) => {
    setIsLoaded(true);
    setProductsData(res.data);
    },
    (error) => {
      setIsLoaded(true);
      setError(error);
    }
    );
  }, []);
  if (error) {
    return <div>Erreur : {error.message}</div>
  } else if (!isLoaded) {
    return <div>
    <Oval stroke="#564AFF"/>
    <p>Loading...</p>
    </div>
  } else {
    return (
      <div className="App">
      <Router>
        <Navigation/>
        <Switch>        
          <Route // route qui renvoie un lien /products-details/id du produit 
            path="/products-details/:id"
            render={(props) => (
              <ProductsDetails 
                products={productsData} // renvoie pour utilisation dans le composant « ProductsDetails » la variable d'état « productsData »
                updatePrice={updatePrice} // renvoie pour utilisation dans le composant « ProductsDetails » la fonction « updatePrice »
                {...props}
              />
            )}
          />
          <Route path="/"> 
            <Products products={productsData} // renvoie pour utilisation dans le composant « Products » la variable d'état « productsData »
            /> 
          </Route>
        </Switch>
      </Router>
    </div>
    )
  }
  // utilisation d'une fonction « updatePrice » dans la fonction App(), cela va permettre de l'utiliser dans d'autres composants (cf le contexte en React)
  
    
    // utilisation de react-router-dom qui permet de créer l'illusion d'avoir plusieurs pages dans notre application
    
}
