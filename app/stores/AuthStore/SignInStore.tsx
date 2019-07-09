import { action, observable } from "mobx";
import { authService } from "../../services/AuthService";
import { navigationService } from "../../services/NavigationService";
import { IRootStore, rootStore } from "../RootStore";
import { delay } from "../../utils";
import { userService } from "../../services/UserService";

export interface ISignInStore {
  username: string
  password: string

  setUsername(value: string): void
  setPassword(value: string): void

  signIn(): Promise<void>

  reset(): void
}

export default class SignInStore implements ISignInStore {
  @observable
  username: string = __DEV__ ? 'tester1' : ''

  @observable
  password: string = __DEV__ ? 'test123' : ''

  @action.bound
  setUsername(value: string): void {
    this.username = value;
    this.validateInputs();
  }

  @action.bound
  setPassword(value: string): void {
    this.password = value;
    this.validateInputs();
  }

  private validateInputs(): void {
    this.username !== "" && this.password !== "";
  }

  @action.bound
  async signIn(): Promise<void> {
    const { userStore, hudStore, alertStore } = rootStore;
    try {
      hudStore.show("Sign in...");
      const user = await authService.signIn(this.username, this.password);
      hudStore.hide();

      userStore.setAuthUser(user);

      navigationService.goBack();

      this.reset();
    } catch (e) {
      console.log(e)
      hudStore.hide();
      alertStore.showAlert({
        title: "Error",
        message: e.message,
        type: "error",
      });
    }
  }

  @action
  reset(): void {
    this.setUsername("");
    this.setPassword("");
  }

}