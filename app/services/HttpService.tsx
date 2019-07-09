import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";
import { UserModel } from "../models";
import { rootStore } from "../stores/RootStore";
import { ApiUrl, urlQuery } from "../utils";
import { navigationService } from "./NavigationService";
import { StorageKeys, storageService } from "./StorageService";
import moment from "moment";

export type JSON = { [key: string]: any }
type Header = { [key: string]: string }

const timeZone = -(new Date().getTimezoneOffset()) / 60;

interface HttpOptions {
  path: string
  method?: string
  key?: string // key to get response object
  body?: JSON // body params
  params?: JSON // query params
  headers?: Header // additional headers
  data?: FormData // FormData
}

interface IHttpService {
  request(options: HttpOptions): Promise<JSON>

  requestSingle<T>(cls: ClassType<T>, options: HttpOptions): Promise<T>
  requestArray<T>(cls: ClassType<T>, options: HttpOptions): Promise<T[]>
}

class HttpService implements IHttpService {

  async request(options: HttpOptions): Promise<JSON> {
    const { headers: additionalHeaders, method = "GET", path } = options,
      headers = await this.makeHeaders(additionalHeaders),
      { url, body } = this.makeRequest(options),
      response = await fetch(url, { method, body, headers });
    if (response.ok) {
      try {
        return await response.json()
      } catch (error) {
        return {};
      }
    }
    // Handle unauthorized status
    const errorMessage = await this.getResponseErrorMessage(response);

    if (response.status === 401) {
      this.unauthorizedHandler();
      throw new Error(errorMessage || `Session timeout. Got status ${response.status}`);
    }

    // Otherwise (DON'T CHANGE THIS LINE)
    throw new Error(errorMessage || `Invalid response. Got status ${response.status}`);
  }

  async requestSingle<T>(cls: ClassType<T>, options: HttpOptions): Promise<T> {
    const { key = "data" } = options;
    const responseObject = await this.request(options);
    if (responseObject.data) {
      if (responseObject.data[key]) {
        return plainToClass(cls, responseObject.data[key] as Object);
      }
      return plainToClass(cls, responseObject.data as Object);
    }
    throw new Error("Invalid data response");
  }

  async requestArray<T>(cls: ClassType<T>, options: HttpOptions): Promise<T[]> {
    const { key = "data" } = options,
      responseObject = await this.request(options);
    if (responseObject.data) {
      if (responseObject.data[key]) {
        return plainToClass(cls, responseObject.data[key]);
      }
      return plainToClass(cls, responseObject.data);
    }
    return [];
  }

  private async makeHeaders(additionalHeaders?: Header): Promise<Header> {
    // Add authorization headers
    const authUser = rootStore.userStore.authUser || await storageService.getGeneric(UserModel, StorageKeys.kAuthUser);

    let headers: Header = { "Content-Type": "application/json" };
    if (authUser && authUser.token) {
      headers["Authorization"] = `Bearer ${authUser.token}`;
    }
    headers["Timezone"] = `${timeZone}`;

    // Append more headers if needed
    if (additionalHeaders) {
      for (const key in additionalHeaders) {
        headers[key] = additionalHeaders[key];
      }
    }

    return headers;
  }

  private async unauthorizedHandler(): Promise<void> {
    const { userStore } = rootStore;
    const user = await storageService.getGeneric(UserModel, StorageKeys.kAuthUser)
    if (user) {
      const isSeeker = user.role === 'seeker';
      userStore.authUser = undefined;
      await storageService.removeItem(StorageKeys.kAuthUser);
      navigationService.navigate(isSeeker ? "SeekerAuth" : "ProviderAuth");
    }

  }

  private async getResponseErrorMessage(response: Response): Promise<string | null> {
    try {
      const json = await response.json();
      const errorData = json.error || {}
      const errorArray = Object.keys(errorData);
      let errorMessage = null
      if (errorArray && errorArray.length > 0) {
        errorMessage = Object.keys(errorData).map(key => errorData[key])[0][0];
      }
      return errorMessage && errorMessage.length > 1 ? errorMessage : null;
    } catch (error) {
      return null
    }

  }

  private makeRequest(options: HttpOptions) {
    const {
      path,
      params,
      body: bodyParams,
      data
    } = options;

    let url = `${ApiUrl}${path}`,
      body: any;

    if (params) {
      const queryString = urlQuery(params);
      url += `?${queryString}`;
    }

    if (bodyParams)
      body = JSON.stringify(bodyParams);

    // Form data
    if (data) {
      body = data
    }

    return { url, body };
  }
}

export const httpService: IHttpService = new HttpService();


