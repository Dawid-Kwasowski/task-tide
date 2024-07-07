export interface IUserInfo {
  user_id: string;
  username: string;
  avatar_url?: string;
}

export type TNewUserInfo = Omit<IUserInfo, "user_id">;

export default interface IUserState {
  user: any;
  userList: IUserInfo[];
}

export interface IOwnerInfo {
  email: string;
  password: string;
}
