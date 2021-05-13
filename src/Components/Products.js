import React, { Component } from 'react';
import '../css/Products.css';
import './ProductsDetails'
import {Link} from 'react-router-dom'

export default class Products extends Component {
  render() {
    const listsProducts = this.props.products.map((listProduct) => {
      return (
        <tbody className="products__body" key={listProduct.id}>
          <tr>
            <td><Link to={{pathname: "/products-details/" + listProduct.id}}>{listProduct.title}</Link></td>
            <td><p className={`${listProduct.category==="men's clothing" ? "category__orange" : "category__green"}`}>{listProduct.category}</p></td>
            <td>{Number(listProduct.price).toFixed(2)}</td>
            <td>
              {Number(listProduct.price * 1.2).toFixed(2)} €
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
