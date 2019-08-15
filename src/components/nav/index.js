import React from "react"
import { Link } from "gatsby"
import { window } from "browser-monads"
import logo from "../../images/compass-logo.svg"
import "./nav.css"

export default () => {
  const isActive = menuItem => {
    return window.location.href.indexOf(menuItem) > 0
  }

  return (
    <nav>
      <div className="nav__items">
        <a href="/" className="nav__item--left">
          <img
            className="nav__item--logo"
            src={logo}
            alt="Traveller Pack Logo"
          />
        </a>
        <Link
          className={
            isActive("contact") ? "nav__item--link active" : "nav__item--link"
          }
          to="/contact"
        >
          Contact
        </Link>
        <Link
          className={
            isActive("blog") || isActive("category")
              ? "nav__item--link active"
              : "nav__item--link"
          }
          to="/blog"
        >
          Blog
        </Link>
      </div>
    </nav>
  )
}
