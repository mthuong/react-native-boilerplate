import { ErrorCode } from '../models/ErrorCode'

export interface APIResponse extends Error {
  status: number
  errors?: ErrorCode[]
}

export type APIServiceType = 'axios'

export interface IAPIService {
  baseURL: string
  type: APIServiceType

  createInstance(baseURL: string): any

  get(url: string, config?: any): Promise<any>

  post(url: string, data?: any, config?: any): Promise<any>

  put(url: string, data?: any, config?: any): Promise<any>

  delete(url: string, config?: any): Promise<any>

  patch(url: string, data?: any, config?: any): Promise<any>

  readonly defaultHeaders: Record<string, any>

  /**
   * Parse errors.
   * return error message.
   */
  parseErrors(errorData: any): string

  /**
   * Handle unauthorized case.
   */
  handleUnauthorized(): Promise<void>
}
