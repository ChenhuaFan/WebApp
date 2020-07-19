import { UserPhase } from '../enums/Entrance';

export interface UserInfo {
  _firstName: string;
  _lastName: string;
  _description: string;
  _gender: string;
  _birthday: string;
  _avatar_url: string;
  _role: string;
}

export class UserInfo {

  constructor(
    firstName: string,
    lastName: string,
    description: string = "一位友善的 RentHouse 会员",
    gender: string = "privacy",
    birthday: string = "2000-7-14",
    avatar_url: string = "/static/imgs/avators/default.png",
    role: string = "user"
  ) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._description = description;
    this._gender = gender;
    this._birthday = birthday;
    this._avatar_url = avatar_url;
    this._role = role;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public get description(): string {
    return this._description;
  }

  public get gender(): string {
    return this._gender;
  }

  public get birthday(): string {
    return this._birthday;
  }

  public get avatar_url(): string {
    return this._avatar_url;
  }

  public get role(): string {
    return this._role;
  }
}

export interface UserState {
  _fbUser: firebase.User | undefined;
  _userInfo: UserInfo | undefined;
  _lastStage: string;
}

export class UserState {

  public constructor(fbUser: firebase.User | undefined = undefined, userInfo: UserInfo | undefined = undefined) {
    this._fbUser = fbUser;
    this._userInfo = userInfo;
    this._lastStage = "login";
  }

  public get hasFBUser(): boolean {
    return this._fbUser !== undefined;
  }

  public get hasUserInfo(): boolean {
    return this._userInfo !== undefined;
  }

  public isFireBaseUserChanged(newUId: string): boolean {
    if (!this._fbUser) {
      return true;
    }
    return this._fbUser.uid === newUId;
  }

  public get userPhase(): number {
    if (!this.hasFBUser) return UserPhase.PHASE_I;
    if (!this.hasUserInfo) return UserPhase.PHASE_II;
    return UserPhase.LOGGED_IN;
  }

  public get userInfo(): UserInfo | undefined {
    return this._userInfo;
  }

  public get fbUser(): firebase.User | undefined {
    return this._fbUser;
  }

  public get uid(): string {
    return this._fbUser ? this._fbUser.uid : "";
  }

  public get avatarUrl(): string {
    return this._userInfo ? this._userInfo.avatar_url : "";
  }

  public get lastStage(): string {
    return this._lastStage;
  }
}