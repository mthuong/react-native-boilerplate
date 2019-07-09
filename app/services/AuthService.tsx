import { plainToClass } from "class-transformer";
import moment from "moment";
import { UserModel } from "../models";
import { rootStore } from "../stores/RootStore";
import { httpService, JSON } from "./HttpService";
import { userService } from "./UserService";
import { storageService, StorageKeys } from "./StorageService";

interface IAuthService {
  validateAuthUser(): Promise<UserModel | null>

  signIn(username: string, password: string): Promise<UserModel>

  signOut(): Promise<void>
}

class AuthService implements IAuthService {

  async validateAuthUser(): Promise<UserModel | null> {
    const json = await storageService.getObject(StorageKeys.kAuthUser);
    if (json) {
      const user = plainToClass(UserModel, json);
      return user
    }

    return null;
  }

  async signIn(username: string, password: string): Promise<UserModel> {
    const responseObject = await httpService.request({
      path: "/login",
      method: "POST",
      body: {
        username: username,
        password: password
      }
    });

    if (responseObject.data && responseObject.data.token && responseObject.data.user) {
      const token = responseObject.data.token,
        userJson = responseObject.data.user;

      const user: UserModel = plainToClass(UserModel, userJson as Object);
      user.token = token;
      await storageService.setItem(StorageKeys.kAuthUser, user);
      return user;
    }

    throw new Error("Invalid login response");
  }

  async signOut(): Promise<void> {
    httpService.request({
      path: "/logout",
    });
    await storageService.removeItem(StorageKeys.kAuthUser);
  }

  private getErrorMessage(json: any): string | null {
    const errorArray = Object.keys(json);
    let message = null
    if (errorArray.length > 0) {
      message = Object.keys(json).map(key => json[key])[0][0];
    }
    return message
  }
}

export const authService: IAuthService = new AuthService();

