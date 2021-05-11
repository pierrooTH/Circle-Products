import React, { Component } from 'react'
import '../css/ProductsDetails.css'

export default class ProductsDetails extends Component {
    state = {
        id: this.props.match.params.id,
        price: []
    }

    render() {
        const {location: {state: {listProduct}}} = this.props;
        return (
            <div className="products__details">
                <h1 className="details__title">{listProduct.title}</h1>
                <div className="details__align--desk">
                    <div className="details__img">
                    <img className="product__img" src={listProduct.image} alt="Affichage du produit"/>
                    </div>
                    <div className="products__align--desk">
                        <h2 className="product__title">Description</h2>
                        <p className="product__description">{listProduct.description}</p>
                        <h2 className="product__title">Price</h2>
                        <form className="form__price">
                            <input type="text" value={listProduct.price} />
                            <p>Price (including VAT): {Math.round((listProduct.price + listProduct.price * 0.2)*100) /100} €</p>
                            <br/>
                            <input className="btn__update" type="submit" value="Update product" />
                        </form>
                    </div>
                    <div className="category__align--desk">
                        <h2 className="product__title">Category</h2>
                        <p className="product__category">{listProduct.category}</p>
                    </div>
                </div>
            </div>
        )
    } 
}
