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
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: "UA-4219222-9",
    //     head: true,
    //     respectDNT: true,
    //   },
    // },
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
    {
      resolve: 'gatsby-plugin-react-axe',
      options: {
        showInProduction: false,

        // Options to pass to axe-core.
        // See: https://github.com/dequelabs/axe-core/blob/master/doc/API.md#api-name-axeconfigure
        axeOptions: {
          // Your axe-core options.
        },
      },
    },
    {
      // Source graphql des ressources textuelles ANDi publiques
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "query",
        fieldName: "andi",
        url: "https://andi.beta.gouv.fr/gql/",
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
