import { action, observable } from "mobx";
import { delay } from "../utils";

export interface IHudStore {
  title?: string
  isVisible: boolean

  show(title?: string): void
  hide(): Promise<void>
}

export default class HudStore implements IHudStore {

  @observable
  title?: string

  @observable
  isVisible: boolean = false

  @action
  show(title?: string): void {
    this.title = title;
    this.isVisible = true;
  }

  @action
  async hide(): Promise<void> {
    this.isVisible = false;
    await delay(500);
  }
}