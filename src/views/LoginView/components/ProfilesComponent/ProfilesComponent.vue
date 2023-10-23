<template>   
   <v-row>
      <v-col>
         <h1 class="text-center text-h2 my-5">{{$t('accounts.chooseProfile')}}</h1>
      </v-col>
   </v-row>
   <v-row justify="center">
      <v-col cols="2" class="d-flex justify-center">
         <div class="d-flex align-center flex-column">
         <v-btn 
         elevation="5"
         @click="emit('createProfile')" 
         variant="tonal" 
         class="text-h4" 
         color="primary" 
         size="100" 
         icon="$plus"></v-btn>
         <span class="text-center mt-5">{{$t('accounts.createProfile')}}</span>
         </div>
      </v-col>
      <template v-if="userList.length > 0">
         <v-col cols="12" md="2" class="align-center justify-space-between d-flex flex-column" v-for="(user, index) in userList">
            <v-avatar color="surface-variant" size="100">
               <template v-if="user.avatar">
                  <v-img :src="user.avatar"></v-img>
               </template>
               <template v-else>
               <span class="text-h5">
                  {{ user.name.charAt(0).toUpperCase() }}
               </span>
               </template>
            </v-avatar>
            <span>{{ user.name }}</span>
         </v-col>
      </template>
   </v-row>
</template>

<script lang="ts" setup>

import { useUserStore } from "@/stores/UserStore/UserStore"

const { userList } = useUserStore()

const emit = defineEmits(['createProfile'])

</script>