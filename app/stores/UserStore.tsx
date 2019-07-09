import { action, observable } from 'mobx';
import { UserModel } from '../models';
import { authService } from '../services/AuthService';
import { navigationService } from '../services/NavigationService';
import { rootStore } from './RootStore';

export enum CalendarScreenType {
  WeekView = 'WeekView',
  MonthView = 'MonthView'
}

export interface IUserStore {
  authUser?: UserModel

  // used for profile modification
  copiedAuthUser?: UserModel

  setAuthUser(user?: UserModel): Promise<void>
  cloneAuthUser(): void

  signOut(): void
  reset(): void
}

export default class UserStore implements IUserStore {

  @observable
  authUser?: UserModel;

  @observable
  copiedAuthUser?: UserModel;

  cloneAuthUser(): void {
    const user = this.authUser
    if (!user) {
      this.copiedAuthUser = undefined;
    }
    this.copiedAuthUser = (user as UserModel).clone();
  }

  @action
  async setAuthUser(user?: UserModel): Promise<void> {
    this.authUser = user;
    if (!user) {
      this.copiedAuthUser = undefined;
      navigationService.navigate("AuthStack");
    } else {
      this.copiedAuthUser = (user as UserModel).clone();
    }
  }

  @action
  reset(): void {

  }

  @action.bound
  async signOut(): Promise<void> {
    const { alertStore, userStore } = rootStore;
    const index = await alertStore.showAlert({
      title: "Log Out",
      message: "Are your sure you want\nto Log Out?",
      type: "error",
      buttonTitles: ["YES", "NOT NOW"],
      buttonStyles: ["default", "cancel"],
    });

    if (index === 0) {
      const { hudStore } = rootStore;
      hudStore.show("Log Out...");
      this.setAuthUser();
      await authService.signOut();
      userStore.reset();

      hudStore.hide();

      navigationService.navigate("Onboard");
    }
  }

}

