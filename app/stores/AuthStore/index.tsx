import { action, observable } from "mobx";
import { IRootStore } from "../RootStore";
import SignInStore, { ISignInStore } from "./SignInStore";
import SignUpStore, { ISignUpStore } from "./SignUpStore";

export interface IAuthStore {
  signInStore: ISignInStore
  signUpStore: ISignUpStore

  currentRoute: string
  setCurrentRoute(route: string): void

  reset(): void
}

export default class AuthStore implements IAuthStore {

  signInStore: ISignInStore = new SignInStore()
  signUpStore: ISignUpStore = new SignUpStore()

  @observable
  currentRoute: string = ""

  @action
  setCurrentRoute(route: string): void {
    this.currentRoute = route;
  }

  @action
  reset(): void {
    this.signInStore.reset();
    this.signUpStore.reset();
  }
}









