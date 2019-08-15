import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Nav from "../components/nav"
import "./blog.css"

export default ({ data }) => {
  // console.log("Mika data")

  const blog = data.contentfulBlog
  return (
    <Layout>
      <SEO
        title={blog.seoTitle}
        description={blog.seoDescription}
        keywords={blog.keywords}
      />
      <Nav />
      <div className="blog__header">
        <div
          className="blog__hero"
          style={{ backgroundImage: `url(${blog.featuredImage.fluid.src})` }}
        ></div>
        <div className="blog__info">
          <h1 className="blog__title">{blog.title}</h1>
        </div>
      </div>
      <div className="blog__wrapper">
        <div className="blog__content">
          <div
            dangerouslySetInnerHTML={{
              __html: `${blog.content.childMarkdownRemark.html}`,
            }}
          ></div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    contentfulBlog(id: { eq: $id }) {
      title
      id
      slug
      content {
        childMarkdownRemark {
          html
        }
      }
      seoTitle
      seoDescription
      seoAuthor
      seoKeywords
      seoImage {
        fluid(maxWidth: 1200, quality: 100) {
          ...GatsbyContentfulFluid
          src
        }
      }
      featuredImage {
        fluid(maxWidth: 1200, quality: 100) {
          ...GatsbyContentfulFluid
          src
        }
      }
    }
  }
`
