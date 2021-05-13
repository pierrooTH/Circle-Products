import React, { Component } from 'react'
import '../css/ProductsDetails.css'
import {AiOutlineArrowLeft} from "react-icons/ai";
import {Link} from 'react-router-dom'


export default class ProductsDetails extends Component {
    constructor(props) {
      super(props);
      // ajout de deux états l'id qu'on récupére de l'API et le prix qui vaut 0
      this.state = { 
          id: this.props.match.params.id, 
          price: 0
        };
    }
    
    // mise en place d'une méthode qui permet de modifier la valeur dans l'input texte 
    updatePrice = (e) => {
      console.log(e);
      this.setState({
        price: e.target.value
      });
    };
    
    /*
    mise en place d'une méthode qui permet au clique du bouton de changer le prix 
    grâce à la méthode "updatePrice ainsi que l'id et l'état du prix du produit
    */
    submitHandler = (e) => {
        // permet au clique du bouton que concerver localement la valeur modifiée 
        localStorage.setItem('price', this.state.price)
      e.preventDefault();
      const {
        match: {
          params: { id }
        }
      } = this.props;
      this.props.updatePrice(id, this.state.price);
      
    };

    // permet de garder la valeur modifiée au refresh de la page 
    componentDidMount() {
        const price = localStorage.getItem('price')
        this.setState({price});
    }
  
    render() {
      const {
        match: {
          params: { id }
        },
        products
        
      } = this.props;
      
      // Ajout d'une variable qui récupére le premier id trouvé dans le tableau "products"
      const listProduct = products.find((product) => product.id === Number(id))
      if (!listProduct) return null;
  
      return (
        <div className="products__details">
          <Link to="/">
            <AiOutlineArrowLeft className="nav__arrow" />
          </Link>
          <h1 className="details__title">{listProduct.title}</h1>
          <div className="details__align--desk">
            <div className="details__img">
              <img
                className="product__img"
                src={listProduct.image}
                alt="Affichage du produit"
              />
            </div>
            <div className="products__align--desk">
              <h2 className="product__title">Description</h2>
              <p className="product__description">{listProduct.description}</p>
              <h2 className="product__title">Price</h2>
              <form className="form__price" onSubmit={this.submitHandler}>
                <input
                name="price"
                  className="input__price"
                  type="text"
                  defaultValue={Number(listProduct.price).toFixed(2)}
                  onChange={this.updatePrice}
                />
                <p>
                  Price (including VAT):{" "}
                  {Number(listProduct.price * 1.2).toFixed(2)} €
                </p>
                <br />
                <input
                  className="btn__update"
                  type="submit"
                  value="Update product"
                />
              </form>
            </div>
            <div className="category__align--desk">
              <h2 className="product__title">Category</h2>
              <p className={`${listProduct.category==="men's clothing" ? "category__orange" : "category__green"} product__category`}>{listProduct.category}</p>
            </div>
          </div>
        </div>
      );
    }
  }
