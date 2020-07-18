export interface UserInfo {
  firstName: string;
  lastName: string;
  description: string;
  gender: string;
  birthday: string;
  avatar_url: string;
  role: string;
}

export class UserState {
  private _fbUser: firebase.User | undefined;
  private _userInfo: UserInfo | undefined;
  private _lastStage: string;

  public constructor(fbUser: firebase.User | undefined = undefined, userInfo: UserInfo | undefined = undefined) {
    this._fbUser = fbUser;
    this._userInfo = userInfo;
    this._lastStage = "login";
  }

  public get isLogin(): boolean {
    return this._fbUser === undefined;
  }

  public isFireBaseUserChanged(newUId: string): boolean {
    if (!this._fbUser) {
      return true;
    }
    return this._fbUser.uid === newUId;
  }

  public get hasUserInfo(): boolean {
    return this._userInfo === undefined;
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