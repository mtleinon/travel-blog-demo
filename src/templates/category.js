import React from "react"
import { Link, graphql, navigate } from "gatsby"
import { window } from "browser-monads"
import Layout from "../components/layout"
import Nav from "../components/nav"
import SEO from "../components/seo"
import "../components/home/home.css"
import "./archive.css"

import headerImg from "../images/general-header-image.jpg"
export default ({ data, pageContext }) => {
  const blogContent = data.allContentfulBlog
  const { currentPage, numPages, category } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const urlName = category.toLowerCase()

  const prevPage =
    currentPage - 1 === 1
      ? `/category/${urlName}`
      : `/category/${urlName}/${currentPage - 1}`
  const nextPage = `/category/${urlName}/${currentPage + 1}`

  const isActive = menuItem => {
    return window.location.href.indexOf(menuItem) > 0
  }

  return (
    <Layout>
      <SEO
        title="Blog"
        keywords={["travel", "travel blog", "travel photography"]}
      />
      <Nav />
      <header>
        <div className="archive__section">
          <div
            className="archive__hero"
            style={{ backgroundImage: `url(${headerImg})` }}
          ></div>
          <div className="archive__nav">
            <Link
              to="/blog"
              className={
                isActive("/blog")
                  ? "archive__nav--link selected"
                  : "archive__nav--link"
              }
            >
              All
            </Link>
            <Link
              to="/category/travel"
              className={
                isActive("/category/travel")
                  ? "archive__nav--link selected"
                  : "archive__nav--link"
              }
            >
              Travel
            </Link>
            <Link
              to="/category/guide"
              className={
                isActive("/category/guide")
                  ? "archive__nav--link selected"
                  : "archive__nav--link"
              }
            >
              Guide
            </Link>
            <Link
              to="/category/opinion"
              className={
                isActive("/category/opinion")
                  ? "archive__nav--link selected"
                  : "archive__nav--link"
              }
            >
              Opinion
            </Link>
            <Link
              to="/category/tech"
              className={
                isActive("/category/tech")
                  ? "archive__nav--link selected"
                  : "archive__nav--link"
              }
            >
              Tech
            </Link>
          </div>
        </div>
      </header>
      <div className="feed">
        {blogContent.edges.map(edge => (
          <div
            key={edge.node.id}
            className="card"
            style={{
              backgroundImage: `linear-gradient(
                to bottom,
                rgba(10,10,10,0) 0%,
                rgba(10,10,10,0) 50%,
                rgba(10,10,10,0.7) 100%),
                url(${edge.node.featuredImage.fluid.src})`,
            }}
            onClick={() => navigate(`/blog/${edge.node.slug}`)}
          >
            {edge.node.category.map(oneCategory => (
              <p className="card__category">{oneCategory.title}</p>
            ))}
            <p className="card__title">{edge.node.title}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <div className="pagination__item">
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              <div className="arrow__back"></div>
            </Link>
          )}
        </div>
        <div className="pagination__item">
          {!isLast && (
            <Link to={nextPage} rel="next">
              <div className="arrow__next"></div>
            </Link>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query CategoryQuery($skip: Int!, $limit: Int!, $category: String!) {
    allContentfulBlog(
      sort: { fields: [createdAt], order: DESC }
      filter: {
        node_locale: { eq: "en-US" }
        category: { elemMatch: { title: { eq: $category } } }
      }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          title
          id
          slug
          createdAt
          category {
            title
            id
          }
          featuredImage {
            fluid(maxWidth: 1200, quality: 100) {
              ...GatsbyContentfulFluid
              src
            }
          }
        }
      }
    }
  }
`
