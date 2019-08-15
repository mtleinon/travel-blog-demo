import React from "react"
// import { Link } from "gatsby"
import Nav from "../components/nav"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./contact.css"

export default () => (
  <Layout>
    <SEO
      title="Contact"
      description="Contact Hunter Becton: Travel Photographer and blogger"
    />
    <Nav />
    <div className="contact__header" />
    <div className="contact__content">
      <form
        method="post"
        name="contact"
        action="/thanks"
        data-netlify="true"
        netlify-honeypot="bot"
        className="contact__form"
      >
        <div className="contact__heading">
          <h1>Contact</h1>
        </div>
        <input type="hidden" name="form-name" value="contact" />
        <div className="field__hidden">
          <label htmlFor="bot">Human don't fill this</label>
          <input id="bot" name="bot" type="text" />
        </div>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" />
        </div>
        <div className="field">
          <label htmlFor="message">Message</label>
          <textarea rows="6" name="message"></textarea>
        </div>
        <div className="submit">
          <button type="submit" className="btn__med">
            Send
          </button>
        </div>
      </form>
    </div>
  </Layout>
)
