const path = require("path")

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    // console.log("MIKA makeRequest")

    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        return result
      })
    )
  })

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  // console.log("MIKA createPages")

  const getBlog = makeRequest(
    graphql,
    `
    {
      allContentfulBlog (
        sort: { fields: [createdAt], order: DESC }
        filter: { node_locale: {eq: "en-US"}},
      )
      {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `
  ).then(result => {
    // console.log("MIKA result", result)

    result.data.allContentfulBlog.edges.forEach(({ node }) => {
      // console.log("MIKA node", node)

      createPage({
        path: `blog/${node.slug}`,
        component: path.resolve("./src/templates/blog.js"),
        context: {
          id: node.id,
        },
      })
    })
  })

  // Creates archive pages for ech blog
  const getArchive = makeRequest(
    graphql,
    `
    {
      allContentfulBlog (
        sort: { fields: [createdAt], order: DESC }
        filter: { node_locale: {eq: "en-US"}},
      )
      {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `
  ).then(result => {
    // console.log("MIKA getArchive", result)
    const blogs = result.data.allContentfulBlog.edges
    const blogsPerPage = 9
    const numPages = Math.ceil(blogs.length / blogsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? "/blog" : `/blog/${i + 1}`,
        component: path.resolve("./src/templates/archive.js"),
        context: {
          limit: blogsPerPage,
          skip: i * blogsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })
  })

  // Creates travel category archive pages
  // const getTravel = makeRequest(
  //   graphql,
  //   `
  //   {
  //     allContentfulBlog (
  //       sort: { fields: [createdAt], order: DESC }
  //       filter: {
  //         node_locale: {eq: "en-US"}
  //         category: {elemMatch: {title: {eq: "Travel"}}}
  //       },
  //     )
  //     {
  //       edges {
  //         node {
  //           id
  //           slug
  //         }
  //       }
  //     }
  //   }
  // `
  // ).then(result => {
  //   console.log("MIKA getArchive", result)
  //   const blogs = result.data.allContentfulBlog.edges
  //   const blogsPerPage = 9
  //   const numPages = Math.ceil(blogs.length / blogsPerPage)

  //   Array.from({ length: numPages }).forEach((_, i) => {
  //     createPage({
  //       path: i === 0 ? "/category/travel" : `/category/travel/${i + 1}`,
  //       component: path.resolve("./src/templates/travel.js"),
  //       context: {
  //         limit: blogsPerPage,
  //         skip: i * blogsPerPage,
  //         numPages,
  //         currentPage: i + 1,
  //       },
  //     })
  //   })
  // })

  // Creates travel category archive pages
  const getCategory = category =>
    makeRequest(
      graphql,
      `
    {
      allContentfulBlog (
        sort: { fields: [createdAt], order: DESC }
        filter: { 
          node_locale: {eq: "en-US"}
          category: {elemMatch: {title: {eq: "${category}"}}}
        },
      )
      {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `
    ).then(result => {
      // console.log("MIKA getArchive", result)
      const blogs = result.data.allContentfulBlog.edges
      const blogsPerPage = 9
      const numPages = Math.ceil(blogs.length / blogsPerPage)
      const urlName = category.toLowerCase()

      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path:
            i === 0 ? `/category/${urlName}` : `/category/${urlName}/${i + 1}`,
          component: path.resolve(`./src/templates/category.js`),
          context: {
            category,
            limit: blogsPerPage,
            skip: i * blogsPerPage,
            numPages,
            currentPage: i + 1,
          },
        })
      })
    })

  return Promise.all([
    getBlog,
    getArchive,
    getCategory("Travel"),
    getCategory("Guide"),
    getCategory("Opinion"),
    getCategory("Tech"),
  ])
}
