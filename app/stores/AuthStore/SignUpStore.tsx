import { action, observable } from "mobx";
import { IRootStore, rootStore } from "../RootStore";
import { userService, ConnectedUserParams } from "../../services/UserService";
import { navigationService } from "../../services/NavigationService";
import { authService } from "../../services/AuthService";

export interface ISignUpStore {
  username: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  email: string

  setUsername(value: string): void
  setPassword(value: string): void
  setConfirmPassword(value: string): void
  setFirstName(value: string): void
  setLastName(value: string): void
  setEmail(value: string): void

  reset(): void

  validateSignUpInputs(): void

  register(): Promise<void>
}

export default class SignUpStore implements ISignUpStore {

  @observable
  username: string = __DEV__ ? 'user' : ''

  @observable
  password: string = __DEV__ ? '12345678' : ''

  @observable
  confirmPassword: string = __DEV__ ? '12345678' : ''

  @observable
  firstName: string = __DEV__ ? 'Firstname' : ''

  @observable
  lastName: string = __DEV__ ? 'Lastname' : ''

  @observable
  email: string = __DEV__ ? 'email@email.com' : ''

  @action.bound
  setUsername(value: string): void {
    this.username = value;
    this.validateSignUpInputs();
  }

  @action.bound
  setPassword(value: string): void {
    this.password = value;
    this.validateSignUpInputs();
  }

  @action.bound
  setConfirmPassword(value: string): void {
    this.confirmPassword = value;
    this.validateSignUpInputs();
  }

  validateSignUpInputs(): void {
    this.username !== "" && this.password !== "" && this.confirmPassword !== "" && this.validateEmail()
  }

  @action.bound
  setFirstName(value: string): void {
    this.firstName = value;
    this.validateSignUpInputs();
  }

  @action.bound
  setLastName(value: string): void {
    this.lastName = value;
    this.validateSignUpInputs();
  }

  @action.bound
  setEmail(value: string): void {
    this.email = value;
    this.validateSignUpInputs();
  }

  private validateEmail(): boolean {
    return this.email !== "";
  }

  @action
  reset(): void {
    this.setUsername("");
    this.setPassword("");
    this.setConfirmPassword("");
    this.setFirstName("");
    this.setLastName("");
    this.setEmail("");
  }

  @action.bound
  async register(): Promise<void> {
    const { alertStore, hudStore, userStore } = rootStore;
    try {
      hudStore.show()

      const user = await userService.register({
        first_name: this.firstName,
        last_name: this.lastName,
        username: this.username,
        password: this.password,
        confirm_password: this.confirmPassword,
        email: this.email,
      })
      hudStore.hide()
      userStore.setAuthUser(user);
      this.reset()
      navigationService.navigate('SeekerMain');
    } catch (error) {
      hudStore.hide()
      alertStore.showAlert({ title: 'Error', message: error.message, type: 'error' })
    }
  }

  async loadRelationShipTypes(): Promise<void> {
    // this.relationShipTypes = await authService.loadAdditionalInfo();
  }
}