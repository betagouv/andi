module.exports = {
  siteMetadata: {
    title: `ANDi`,
    description: `Faciliter l'immersion professionnelle des personnes en situation de handicap`,
    author: `@ANDi_betagouv`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    // `gatsby-plugin-eslint`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-favicon`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-4219222-9",
        head: true,
        respectDNT: true,
      },
    },
    {
      resolve: `gatsby-plugin-hotjar`,
      options: {
        id: 1404590,
        sv: 6
      },
    },
    {
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: '94',
        matomoUrl: 'https://stats.data.gouv.fr',
        siteUrl: 'https://andi.beta.gouv.fr'
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
