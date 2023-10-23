export interface IUserInfo {
   name: string
   avatar?: string
 }

 export default interface IUserState {
  user: IUserInfo | null
  userList: IUserInfo[]
 }