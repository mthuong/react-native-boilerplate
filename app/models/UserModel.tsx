import { Expose, Transform, Type, Exclude, classToClass } from "class-transformer";
import { observable, computed } from "mobx";
import moment from "moment";

export type Role = "seeker" | "staff";

export class UserModel {
  @Expose({ name: "fake_id" })
  @Transform((value, obj) => obj.user_id || obj.id || value)
  id: string = ""

  username: string = ""

  @Expose({ name: "first_name" })
  @observable
  firstName: string = ""

  @Expose({ name: "last_name" })
  @observable
  lastName: string = ""

  @observable
  name: string = ""

  @observable
  email: string = ""

  @observable
  address: string = ""

  @observable
  @Expose({ name: 'date_of_birth' })
  @Transform((value) => value ? moment(value, 'YYYY-MM-DD').toDate() : new Date(1970, 1, 1))
  dob: Date = new Date()

  token?: string = "" // Authentication token

  @computed
  get fullname(): string {
    return this.name !== "" ? this.name : `${this.firstName} ${this.lastName}`;
  }

  get displayName(): string {
    return `${this.firstName} ${this.lastName.charAt(0).toUpperCase()}`
  }

  clone(): UserModel | undefined {
    return classToClass(this, { ignoreDecorators: true });
  }
}



