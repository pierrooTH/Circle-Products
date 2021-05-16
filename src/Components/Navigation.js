import React, { Component } from 'react'
import '../css/Navigation.css'
import logo from '../Assets/logo-circle-products.png'
import {Link} from 'react-router-dom'

export default class Navigation extends Component {
    
    render() {
        return (
            // mise en place de la sideBar de navigation 
            <div className="container">
                <div className="navigation">
                    <Link to="/"><img className="navigation__img" src={logo} alt="Faux logo Circle Products"/></Link>
                    <ul className="navigation__link">
                    <li>
                        <a className="navigation__items" href="/">Dashboard</a>
                    </li>
                    <li>
                        <a className="navigation__items item--highlithted" href="/">Products management</a>
                    </li>
                    <li>
                        <a className="navigation__items items--border" href="/">Employees management</a>
                    </li>
                    <li>
                        <a className="navigation__items" href="/">Logout</a>
                    </li>
                    </ul>
                </div>
            </div>
        )
    }
}
