import { httpService, JSON } from "./HttpService";
import { UserModel } from "../models";
import { plainToClass } from "class-transformer";
import { storageService, StorageKeys } from "./StorageService";
import { rootStore } from "../stores/RootStore";

export interface RegisterParams {
  username: string,
  password: string,
  confirm_password: string,
  first_name: string,
  last_name: string,
  email: string,
}

interface IUserService {
  register(params: RegisterParams): Promise<UserModel>
}


class UserService implements IUserService {
  async register(params: RegisterParams): Promise<UserModel> {
    const responseObject = await httpService.request({
      method: 'POST',
      path: `/register`,
      body: params,
    })
    if (responseObject && responseObject.token && responseObject.user) {
      const token = responseObject.token,
        userJson = responseObject.user;

      const user: UserModel = plainToClass(UserModel, userJson as Object);
      user.token = token;
      await storageService.setItem(StorageKeys.kAuthUser, user);
      return user;
    }
    throw new Error(this.getErrorMessage(responseObject) || 'Something went wrong. Please try again later!')
  }

  private getErrorMessage(json: JSON): string | null {
    const errorData = json.data
    const errorArray = Object.keys(errorData);
    let message = null
    if (errorArray.length > 0) {
      message = Object.keys(errorData).map(key => errorData[key])[0][0];
    }
    return message.length > 1 ? message : null
  }
}

export const userService: IUserService = new UserService();
