import React, { Component } from 'react';
import '../css/Products.css';
import './ProductsDetails'
import {Link} from 'react-router-dom'

export default class Products extends Component {
  render() {
    // on récupére les données grâce à props, précédemment récupéré dans le composant App 
    // puis on les ajoute dans un nouveau tableau listProduct qui retourne un tableau en JSX avec les valeurs des données 
    const listsProducts = this.props.products.map((listProduct) => {
      return (
        <tbody className="products__body" key={listProduct.id}>
          <tr>
            <td className="title__responsive" data-label="Product name"><Link  to={{pathname: "/products-details/" + listProduct.id}} 
            // grâce à l'id du produit on peut transférer le produit en question vers une page plus détaillé grâce au react-router-dom et <Link />
            >{listProduct.title}</Link>
            </td>
            <td className="title__responsive" data-label="Category"><p  className={`${listProduct.category==="men's clothing" ? "category__orange" : "category__green"}`}
            // utilisation de l'opérateur ternaire pour définir le type de catégorie:
            // si la catégorie est strictement égal à "men's clothing" alors on utilise la classe "category__orange" sinon on utilise "category__green"
            >{listProduct.category}</p></td>
            <td className="title__responsive td__price" data-label="Price"> 
              {Number(listProduct.price).toFixed(2) 
              // utilisation de la méthode .toFixed(2) qui permet de garder 2 chiffres après la virgule 
              } €
            </td>
            <td className="title__responsive" data-label="Price (including VAT)">
              {Number(listProduct.price * 1.2).toFixed(2)
              // ajout d'une TVA de 20% au prix de l'API, toujours en utilisant la méthode .toFixed(2) pour fixer le prix à deux chiffres après la virgule
              } €
            </td>
          </tr>
        </tbody>
      );
    });

    return (
      <main className="products">
        <h1 className="products__title">Products management</h1>
        <table cellSpacing="0">
          <thead className="products__head">
            <tr>
              <th className="table--title">Product name</th>
              <th className="table--title">Category</th>
              <th className="table--title">Price</th>
              <th className="table--title">Price (including VAT)</th>
            </tr>
          </thead>
          {listsProducts}
        </table>
      </main>
    );
  }
}
