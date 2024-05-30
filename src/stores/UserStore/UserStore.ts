import { defineStore } from 'pinia'
import IUserState, { TNewUserInfo, IOwnerInfo, IUserInfo } from './models/UserInfo'
import { supabase } from '@/plugins/supabase'
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '@vueuse/core'
export const useUserStore = defineStore('UserStore', {
   state: (): IUserState => ({
      userList: [] as IUserInfo[],
      user: useLocalStorage('pinia/user/user-info', {
         user: {} as IUserInfo
      }
      )
   }),
   actions: {
      async getProfiles(): Promise<void> {
         try {
            const { data, error, status } = await supabase
               .from('profiles')
               .select(`user_id, username, avatar_url`)
            if (error && status !== 406) throw error

            if (data) {
               this.userList = <any>data
            }
         } catch (err) {
            console.log(err)
         }
      },

      async addNewUser(user: TNewUserInfo): Promise<any> {
         try {
            if (this.userList
               .some((userInList: IUserInfo): boolean => user.username === userInList.username)) {
               throw new Error('Error: 409')
            }

            const { error } = await supabase
               .from('profiles')
               .insert({
                  user_id: uuidv4(),
                  updated_at: new Date(),
                  username: user.username,
                  avatar_url: user.avatar_url,
               })

            if (error) throw error

            return user
         } catch (e: any) { Promise.reject(e.message) }
      },
      async removeUser(user_id: string): Promise<any> {
         try {
            const { error } = await supabase
               .from('profiles')
               .delete()
               .eq('user_id', user_id)

            if (error) throw error
            await this.getProfiles()

         } catch (e: any) { Promise.reject(e.message) }
      },

      async editUsername(user_id: string, username: string): Promise<any> {
         try {
            const { error } = await supabase
               .from('profiles')
               .update({ username })
               .eq('user_id', user_id)

            if (error) throw error
            await this.getProfiles()
         } catch (e: any) { Promise.reject(e.message) }
      },

      async editAvatar(user_id: string, avatar_url: any): Promise<any> {
         try {
            console.log('edit avatar', avatar_url)
            const { error } = await supabase
               .from('profiles')
               .update({ avatar_url })
               .eq('user_id', user_id)
            if (error) throw error
            await this.getProfiles()
         } catch (e: any) {
            Promise.reject(e.message)
         }
      },

      async removeAvatar(user_id: string): Promise<any> {
         try {
            const { error } = await supabase
            .from('profiles')
            .update({avatar_url: null})
            .eq('user_id', user_id)
         if (error) throw error
         await this.getProfiles()
         } catch (e: any) {
            Promise.reject(e.message)
         }
      },

      async saveUserInfo(user: IUserInfo): Promise<any> {
         this.user = user
      },

      async removeUserInfo(): Promise<any> {
         localStorage.removeItem('')
      },

      async singUpOwner(owner: IOwnerInfo): Promise<void> {
         try {
            const { error } = await supabase.auth.signUp(owner)
            if (error) {
               console.log("error", error)
            }

         } catch (e) {
            console.log(e);
         }
      },

      async signInOwner(owner: IOwnerInfo): Promise<any> {
         try {
            const { error } = await supabase.auth.signInWithPassword(owner)

            if (error) {
               throw error
            }

            const { data: { user } } = await supabase.auth.getUser()

            return user?.aud
         } catch (e) {
            console.log(e)
         }
      },

      async signOutOwner(): Promise<void> {
         await supabase.auth.signOut()
      }
   }
})