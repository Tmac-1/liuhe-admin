import fetch from 'dva/fetch';
import config from './config';
import cookie from 'js-cookie'

const { serverUrl } = config;

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  const response = await fetch(
     url.startsWith('http') ? url : serverUrl.concat(url),
     Object.assign({},options,
      { 
        // headers:{'x-auth-token':cookie.get('x-auth-token') || ''},
        mode: 'cors',
      }) 
   );
  // console.log('response',response)
  checkStatus(response);

  // const data = await response;
  const data = await response.json();
  return data;
}
