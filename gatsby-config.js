module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
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
    `gatsby-plugin-sharp`,
    `gatsby-plugin-favicon`,
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
    // FIXME: Once obtained, set site id
    // {
    //   resolve: 'gatsby-plugin-matomo',
    //   options: {
    //     siteId: 'YOUR_SITE_ID',
    //     matomoUrl: 'https://YOUR_MATOMO_URL.COM',
    //     siteUrl: 'https://YOUR_LIVE_SITE_URL.COM'
    //   }
    // }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
