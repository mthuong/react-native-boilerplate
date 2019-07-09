import { NavigationContainerProps } from "react-navigation";
import AlertStore, { IAlertStore } from "./AlertStore";
import AuthStore, { IAuthStore } from "./AuthStore";
import HudStore, { IHudStore } from "./HudStore";
import UserStore, { IUserStore } from "./UserStore";

export interface AppProps extends NavigationContainerProps {
  rootStore: IRootStore
}

export interface IRootStore {
  hudStore: IHudStore
  alertStore: IAlertStore
  userStore: IUserStore
  authStore: IAuthStore
}

class RootStore implements IRootStore {
  hudStore: IHudStore = new HudStore()
  alertStore: IAlertStore = new AlertStore()
  userStore: IUserStore = new UserStore()
  authStore: IAuthStore = new AuthStore()
}

export const rootStore: IRootStore = new RootStore()