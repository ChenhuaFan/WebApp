import { UserPhase } from '../enums/Entrance';

export interface UserInfo {
  _description: string;
  _gender: string;
  _birthday: string;
  _role: string;
}

export class UserInfo {

  constructor(
    description: string = "一位友善的 RentHouse 会员",
    gender: string = "privacy",
    birthday: string = "2000-7-14",
    role: string = "user"
  ) {
    this._description = description;
    this._gender = gender;
    this._birthday = birthday;
    this._role = role;
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

  public get role(): string {
    return this._role;
  }
}

export interface UserState {
  _fbUser: firebase.User | undefined;
  _userInfo: UserInfo | undefined;
  _lastStage: string;
}

// UserState
export class UserState {

  public constructor(fbUser: firebase.User | undefined = undefined, userInfo: UserInfo | undefined = undefined) {
    this._fbUser = fbUser;
    this._userInfo = userInfo;
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
    if (!this._fbUser) return UserPhase.PHASE_I;
    if (!this._fbUser.photoURL) return UserPhase.PHASE_II;
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
}