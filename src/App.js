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
  Déclaration de plusieurs variables d'état
  */
  const [error, setError] = useState(null); // variable d'état error, son état initial vaut null
  const [productsData, setProductsData] = useState([]); // variable d'état productsData, son état initial vaut un tableau vide
  const [isLoaded, setIsLoaded] = useState(false); // variable d'état isLoaded, son état initial vaut false

  // Fonction anonyme qui va permettre de mettre à jour le prix d'une donnée d'une API grâce à son ID et son prix de départ
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

  // utilisation du Hook useEffect qui va nous servir a récupérer les données de l'API "fake store API" dès que celles-ci sont chargées
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products?limit=7").then((res) => {
    setIsLoaded(true); // à la récupération des données on change l'état de isLoaded en true
    setProductsData(res.data); // à la récupération des données on change l'état de productsData : 
    // on ajoute les données de l'API à l'intérieur du tableau vide
    },
    (error) => { 
      setIsLoaded(true);
      setError(error);
    }
    );
  }, []);
  
  /*
  Si il y a une erreur on retourne un message d'erreur, 
  sinon si isLoaded vaut true on retourne un chargement de la parge 
  sinon on retourne la page qui a correctement chargée 
  */
  if (error) {
    return <div>Erreur : {error.message}</div>
  } else if (!isLoaded) {
    return <div className="loading">
    <Oval stroke="#564AFF"/>
    <p>Loading...</p>
    </div>
  } else {
    return (
      <div className="App">
      <Router // utilisation de react-router-dom qui permet de créer l'illusion d'avoir plusieurs pages dans notre application
      > 
        <Navigation // ajout du composant Navigation, qui est le menu de l'application
        />
        <Switch>        
          <Route // route qui renvoie un lien /products-details/id du produit 
            path="/products-details/:id"
            render={(props) => (
              <ProductsDetails 
                products={productsData} // renvoie pour utilisation dans le composant « ProductsDetails » la variable d'état « productsData »
                updatePrice={updatePrice} // renvoie pour utilisation dans le composant « ProductsDetails » la fonction « updatePrice »
                {...props} // renvoie renvoie pour utilisation dans le composant « ProductsDetails » l'ensemble des propriétés 
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
}
