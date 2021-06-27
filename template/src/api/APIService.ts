import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import lodash from 'lodash'

// import store from 'stores/store'
import { RootNavigation } from '../navigator'
import { NAV_SCREENS } from '../navigator/RouteNames'

import API from './API'
import { APIServiceType, IAPIService } from './IAPIService'
// import { loggingService } from './LoggingService'

export const SERVICE_REQUEST_TIMEOUT = 80000

/**
 * API Service that called from axios with no protection ssl pining
 */
export class AxiosAPIService implements IAPIService {
  baseURL: string = API.BASE_URL

  type: APIServiceType = 'axios'

  axios: AxiosInstance = Axios.create({ timeout: SERVICE_REQUEST_TIMEOUT })

  responseInterceptor?: number

  constructor(baseURL: string = API.BASE_URL) {
    this.baseURL = baseURL
    this.createInstance(baseURL)
  }

  /**
   * Return an axios instance with default configs.
   * @param baseURL baseURL.
   */
  createInstance = (baseURL: string = API.BASE_URL): AxiosInstance => {
    const config: AxiosRequestConfig = {}

    if (baseURL) {
      config.baseURL = baseURL
    }
    config.headers = this.defaultHeaders
    config.timeout = SERVICE_REQUEST_TIMEOUT

    const instance = Axios.create(config)

    // Add response interceptor for token timeout or service offline
    this.responseInterceptor = instance.interceptors.response.use(
      response => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // loggingService.logAxiosResponse(response)
        return response
      },
      error => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        if (error && error.response) {
          if (error.response.status === 401) {
            if (error.response.data) {
              error.message = this.parseErrors(error.response.data)
            }
            this.handleUnauthorized()
          } else if (error.response.data) {
            error.message = this.parseErrors(error.response.data)
          }
        } else if (error && error.request) {
          // Handle request timeout
          if (
            error.request.status === 0 &&
            lodash.isString(error.request._response)
          ) {
            error.message = error.request._response
          }
        }
        // Log data to firebase.
        if (error) {
          // const requestConfig = lodash.get(error, ['response', 'config'], {})
          // const response = lodash.get(error, ['response'], {})
          // loggingService.logAxiosError(error.message, requestConfig, response)
        }
        return Promise.reject(error)
      }
    )
    instance.defaults.timeout = SERVICE_REQUEST_TIMEOUT
    this.axios = instance
    return instance
  }

  /**
   * Return a object value which describes the HTTP request headers.
   */
  get defaultHeaders() {
    // FIXME: Need to update user token if needed
    // const userToken = store.getState().auth.user
    // if (userToken) {
    //   return {
    //     Authorization: userToken,
    //   }
    // }

    return {}
  }

  /**
   * Perform a GET request.
   * @param url path of the request.
   * @param config http request config.
   */
  get(url: string, config?: any) {
    return this.axios.get(url, {
      headers: this.defaultHeaders,
      ...config,
    })
  }

  /**
   * Perform a POST request.
   * @param url path of the request.
   * @param data json or form-data request body.
   * @param config http request config.
   */
  post(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axios.post(url, data, {
      headers: this.defaultHeaders,
      ...config,
    })
  }

  /**
   * Perform a PUT request.
   * @param url path of the request
   * @param data json or form-data request body
   * @param config http request config.
   */
  put(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axios.put(url, data, {
      headers: this.defaultHeaders,
      ...config,
    })
  }

  /**
   * Perform a DELETE request.
   * @param url path of the request
   * @param config http request config.
   */
  delete(url: string, config?: AxiosRequestConfig) {
    return this.axios.delete(url, {
      headers: this.defaultHeaders,
      ...config,
    })
  }

  /**
   * Perform a PATCH request.
   * @param url path of the request.
   * @param data json or form-data request body.
   * @param config http request config.
   */
  patch(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axios.patch(url, data, {
      headers: this.defaultHeaders,
      ...config,
    })
  }

  /**
   * Return a string value which combines an errors.
   * @param errorData errorData.
   */
  parseErrors = (errorData: any): string => {
    return errorData.message && lodash.isString(errorData.message)
      ? errorData.message
      : ''
  }

  /**
   * Handle unauthorized flow.
   */
  async handleUnauthorized(): Promise<void> {
    RootNavigation.navigate(NAV_SCREENS.SignIn)
  }
}

// Uncomment this line if you use Axios.
export const apiService = new AxiosAPIService(API.BASE_URL)
