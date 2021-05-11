import React, { Component } from 'react';
import '../css/Products.css';
import axios from 'axios';
import './ProductsDetails'
import {Link} from 'react-router-dom'

export default class Products extends Component {
    state = {
        productsData: []
      }
      componentDidMount = () => {
        axios.get('https://fakestoreapi.com/products?limit=7')
        .then(res => {
          console.log(res.data)
          this.setState ({
            productsData: res.data
          })
        })
      }
    render() {
        const listsProducts = this.state.productsData.map(listProduct => {
            return <tbody className="products__body">
                    <tr>
                        <td> <Link to={{pathname: "/products-details/" + listProduct.id,state: {listProduct}}}>{listProduct.title}</Link></td>
                        <td className="products__category">{listProduct.category}</td>
                        <td>{listProduct.price}</td>
                        <td>{Math.round((listProduct.price + listProduct.price * 0.2)*100) /100}</td>
                    </tr> 
              </tbody>
          })
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
        )
    }
}
