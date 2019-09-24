/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
//

import "./src/styles/template.css"
import './src/styles/icomoon.css'
// import './src/styles/mozilla-foundation-fonts.css'
import "./src/styles/main.css"
import "./src/styles/matching.css"

export const onClientEntry = () => {
  window.onload = () => {
    const _paq = window._paq || []
    _paq.push(["alwaysUseSendBeacon"]);
    }
}
