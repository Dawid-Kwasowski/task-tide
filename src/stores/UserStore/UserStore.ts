import { defineStore } from 'pinia'
import IUserState, { IUserInfo } from './models/UserInfo'

export const useUserStore = defineStore('UserStore', {
   state: (): IUserState => ({
      userList: [],
      user: null      
   }),
   actions: {
      async addNewUser(user: IUserInfo): Promise<any> {
         try {
            if(this.userList
               .some((userInList: IUserInfo): boolean => user.name === userInList.name)) {
                  throw new Error('Error: 409')
               }
            this.userList.push({
               name: user.name,
               avatar: user.avatar ?? undefined
            })
            return user
         } catch (e: any) { Promise.reject(e.message)  }
      },

      async saveUserInfo(user: IUserInfo): Promise<any> {
         console.log('Saving user')
         this.user = user
      }
   }
})