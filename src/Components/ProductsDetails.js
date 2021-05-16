import React, { Component } from 'react'
import '../css/ProductsDetails.css'
import {AiOutlineArrowLeft} from "react-icons/ai";
import {Link} from 'react-router-dom'


export default class ProductsDetails extends Component {
    constructor(props) {
      super(props);
      // ajout de plusieurs états
      this.state = { 
          id: this.props.match.params.id, // l'id qu'on récupére de l'API 
          price: 0, // l'état price qu'on définit à 0 pour pouvoir le modifier par la suite
          rememberPrice: false, // l'état rememberPrice qu'on définit à false
          priceValid: false, // l'état priceValid qu'on définit également à false
          submitDisabled: true // l'état submitDisabled qu'on définit à true 
        };
    }
    
    // mise en place d'une méthode qui permet de modifier la valeur du prix dans l'input texte dédié
    // et qui permet de modifier le prix seulement si l'input à été modifié 
    updatePrice = (e) => {
      // déclaration de la variable priceValid qui prend une condiiton ternaire :
      // si la valeur de l'input text est modifiée alors priceValid est définit sur true sinon il est sur false
      let priceValid = e.target.value ? true : false;
      let submitValid = this.state.priceValid // on ajoute l'état de priceValid à la variable submitValid
      this.setState({
        price: e.target.value, // on modifie l'état de price pour qu'on puisse modifier le prix
        priceValid: priceValid, // l'état priceValid vaut maintenant la variable priceValid 
        submitDisabled: !submitValid // submitDisabled vaut maintenant l'inverse de submitValid à savoir true

      });
    };
    /*
    ces nouveaux états vont nous permettre de ne pas pouvoir appuyer sur le bouton si le prix n'a pas été modifié 
    car si le prix est modifié l'état de priceValid passe à true 
    et sumbitDisabled passe donc à false comme c'est l'inverse de submitValid qui lui vaut l'état de priceValid
    */

    /*
    mise en place d'une méthode qui permet au clique du bouton de changer le prix 
    grâce aux propriétes de la méthode updatePrice avec comme paramètre l'id et l'état du prix du produit
    */
    submitHandler = (e) => {
      e.preventDefault();
      const {
        match: {
          params: { id }
        }
      } = this.props;
      this.props.updatePrice(id, this.state.price);

      //const { price } = this.state;
      //localStorage.setItem('price', price);
    };

    /* permet de garder la valeur modifiée au refresh de la page (mais ne fonctionne pas)
    componentDidMount() {
      const price = localStorage.getItem('price');
      this.setState({ price});
    }*/
  
    render() {
      const {
        match: {
          params: { id }
        },
        products
        
      } = this.props;
      
      // Ajout d'une variable qui récupére le premier id trouvé dans le tableau "products"
      const listProduct = products.find((product) => product.id === Number(id))
      // si listProduct n'est pas trouvé, cela retourne un résultat null
      if (!listProduct) return null;
  
      return (
        <article className="products__details">
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
              <form className="form__price" onSubmit={this.submitHandler}
              /* ajout de la méthode submitHandler 
              qui permet au clique de l'input de type "submit" 
              de renvoyer (grâce à l'id) le prix modifié ainsi que son prix TTC */
              >
                <input
                name="price"
                  className="input__price"
                  type="text"
                  defaultValue={Number(listProduct.price).toFixed(2)}
                  onChange={this.updatePrice} // utilisation de la méthode updatePrice pour changer la valeur du prix dans l'input 
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
                  disabled={this.state.submitDisabled} // Ajout de la désactivation du bouton grâce à l'état submitDisabled si cet état vaut true cela veut dire que le prix n'a pas été modifié 
                />
              </form>
            </div>
            <div className="category__align--desk">
              <h2 className="product__title">Category</h2>
              <p className={`${listProduct.category==="men's clothing" ? "category__orange" : "category__green"} product__category`}>{listProduct.category}</p>
            </div>
          </div>
        </article>
      );
    }
  }
