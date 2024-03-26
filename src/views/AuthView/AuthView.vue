<template>
   <div>
      <v-container>
         <v-row>
            <v-col>
               <v-card elevation="5">
                  <div class="pa-2 d-flex justify-center">
                     <v-avatar class="elevation-20" size="150">
                        <v-img cover src="@/assets/images/TaskTide-logos.jpeg"></v-img>
                     </v-avatar>
                  </div>
                  <v-tabs
                     fixed-tabs
                     grow
                     v-model="tab"
                  >
                     <v-tab value="signInTab">
                        {{ $t('auth.signInTab') }}
                     </v-tab>
                     <v-tab value="signUpTab">
                        {{ $t('auth.signUpTab') }}
                     </v-tab>
                  </v-tabs>
                  <v-divider :thickness="10"></v-divider>
               </v-card>
            </v-col>
         </v-row>
         <v-row>
            <v-col>
               <v-window v-model="tab">
                  <v-window-item value="signInTab">
                     <sign-in-component></sign-in-component>
                  </v-window-item>
                  <v-window-item value="signUpTab">
                     <sign-up-component></sign-up-component>
                  </v-window-item>
               </v-window>
            </v-col>
         </v-row>
      </v-container>
   </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import SignUpComponent from './components/SignUpComponent/SignUpComponent.vue'
import SignInComponent from './components/SignInComponent/SignInComponent.vue'
const tab = ref(null)

</script>