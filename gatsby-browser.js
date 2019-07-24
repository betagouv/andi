/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
//

import "./src/styles/template.css"
import "./src/styles/bootstrap-grid.css"
import "./src/styles/style.css"

export const onClientEntry = () => {
  window.onload = () => {
    const _paq = window._paq || []
    _paq.push(["alwaysUseSendBeacon"]);
    }
}
