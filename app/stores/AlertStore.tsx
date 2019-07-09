import { observable, action } from 'mobx';
import { delay } from '../utils';

export type AlertType = "success" | "error";
export type AlertButtonStyle = "cancel" | "default";

export interface AlertOptions {
  title?: string
  message?: string
  type?: AlertType
  hasCloseButton?: boolean
  autoCloseAfterSeconds?: number
  buttonTitles?: string[]
  buttonStyles?: AlertButtonStyle[]
}

export interface IAlertStore {
  options: AlertOptions
  isVisible: boolean

  showAlert(options?: AlertOptions): Promise<number>
  hideAlert(index: number): Promise<void>

  showError(message: string): void

}

const defaultOptions: AlertOptions = {
  title: '',
  message: '',
  type: 'success',
  hasCloseButton: false,
  buttonTitles: ["OK"],
  buttonStyles: ["default"],
}

export default class AlertStore implements IAlertStore {

  @observable
  options: AlertOptions = {
    title: '',
    message: '',
    type: 'success',
    hasCloseButton: false,
    buttonTitles: ["OK"],
    buttonStyles: ["default"],
  };

  @observable
  isVisible = false;

  private resolver: any;

  @action
  showAlert(options?: AlertOptions): Promise<number> {
    if (options)
      this.options = { ...defaultOptions, ...options };
    this.isVisible = true;
    return new Promise((resolve) => this.resolver = resolve);
  }

  @action
  async hideAlert(index: number): Promise<void> {
    this.isVisible = false;
    await delay(500);

    this.resolver && this.resolver(index);
    this.resolver = null;
  }

  @action
  showError(message: string): void {
    this.options = {...defaultOptions, type: 'error', message, title: 'Error'}
    this.isVisible = true;
  }
}
