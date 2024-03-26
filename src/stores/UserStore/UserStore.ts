import { defineStore } from 'pinia'
import IUserState, { IUserInfo, IOwnerInfo } from './models/UserInfo'
import { supabase } from '@/plugins/supabase'

export const useUserStore = defineStore('UserStore', {
   state: (): IUserState => ({
      userList: [],
      user: null,
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
      },

      async singUpOwner(owner: IOwnerInfo): Promise<void> {
         try {
            const { data, error } = await supabase.auth.signUp(owner)
            console.log("data", data)
            if(error) {
               console.log("error", error)
            }

         } catch (e) {
            console.log(e);
         }
      },

      async signInOwner(owner: IOwnerInfo): Promise<any> {
         try {
            const { data, error } = await supabase.auth.signInWithPassword(owner)
            console.log("data", data)
            if(error) {
               console.log("error", error)
            }
         } catch (e) {
            console.log(e)
         }
      },

      async signOutOwner() {
         const { error } = await supabase.auth.signOut()
      }
   }
})