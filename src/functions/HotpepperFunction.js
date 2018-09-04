import axios from 'axios'
import hotPepperApiKey from '../api_keys/hotpepper'

// -------------------------------------------------------
// リストの取得
// -------------------------------------------------------
export function getListHotpepper (options) {
  const params = Object.assign({
    key: hotPepperApiKey,
    format: 'json'
  }, options)

  return axios.get('https://webservice.recruit.co.jp/hotpepper/gourmet/v1/', {params: params})
    .then((response) => {
      return response.data.results
    }).catch((error) => {
      return {
        color: 'error',
        text: error
      }
    })
}

// -------------------------------------------------------
// エリアの取得
// -------------------------------------------------------
export function getAreaHotpepper (area, options) {
  const params = Object.assign({
    key: hotPepperApiKey,
    format: 'json'
  }, options)

  return axios.get(`https://webservice.recruit.co.jp/hotpepper/${area}/v1/`, {params: params})
    .then((response) => {
      return response.data.results[area]
    }).catch((error) => {
      return {
        color: 'error',
        text: error
      }
    })
}
