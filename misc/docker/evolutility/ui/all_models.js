/*
  Evolutility UI Models
  https://github.com/evoluteur/evolutility-ui-react
*/

import {
    prepModel,
    prepModelCollecs
} from '../utils/dico'

import user from './user_model'
import asset from './asset_model'
import company from './company_model'


let models = {
    user: user,
    asset: asset,
    company: company,
}

const ms = Object.keys(models)
// need 2 passes for field map to be populated first, then collecs
ms.forEach(m => {
    models[m] = prepModel(models[m])
})
ms.forEach(m => {
    models[m] = prepModelCollecs(models, models[m])
})

export default models
