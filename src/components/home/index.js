import "./home.css"

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { navigate } from "@reach/router"
export default () => (
  <StaticQuery
    query={graphql`
      query HomeQuery {
        allContentfulBlog(
          sort: { fields: [createdAt], order: DESC }
          filter: { node_locale: { eq: "en-US" }, homePage: { eq: true } }
        ) {
          edges {
            node {
              id
              slug
              title
              category {
                title
                id
              }
              featuredImage {
                fluid(maxWidth: 1200, quality: 85) {
                  src
                  ...GatsbyContentfulFluid
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <div className="feed">
        {data.allContentfulBlog.edges.map(edge => (
          <div
            key={edge.node.id}
            className="card"
            style={{
              backgroundImage: `linear-gradient(
                  to bottom,
                  rgba(10,10,10,0.3) 0%,
                  rgba(10,10,10,0.4) 50%,
                  rgba(10,10,10,0.6) 100%
                ),
                url(${edge.node.featuredImage.fluid.src})`,
            }}
            onClick={() => navigate(`/blog/${edge.node.slug}`)}
          >
            {edge.node.category.map(oneCategory => (
              <p key={oneCategory.id} className="card__category">
                {oneCategory.title}
              </p>
            ))}
            <p className="card__title">{edge.node.title}</p>
          </div>
        ))}
      </div>
    )}
  />
)
