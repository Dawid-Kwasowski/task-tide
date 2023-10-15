<template>
   <v-row justify="center">
      <v-card elevation="5" variant="tonal" color="primary" class="pa-2">
         <v-container>
            <v-row>
               <v-col cols="12">
                  <v-card-title class="text-h3">{{ $t('accounts.newProfile.t') }}</v-card-title>
               </v-col>
               <v-col cols="12">
                  <v-card-subtitle class="text-wrap">{{ $t('accounts.newProfile.subtitle') }}</v-card-subtitle>
               </v-col>
               <v-col cols="12">
                  <v-divider class="rounded my-2" :thickness="2"></v-divider>
               </v-col>
            </v-row>
            <v-row align="center" justify="space-around">
               <v-col cols="12" sm="2"  class="d-flex justify-center">
                  <v-hover #="{isHovering, props}">
                     <v-avatar :variant="!isHovering ? 'tonal' : 'elevated'" v-bind="props" color="surface-variant" size="80">
                        <template v-if="selectedImage">
                           <v-menu v-model="menu" :close-on-content-click="false">
                              <template #activator="{props}">
                                 <v-img v-bind="props" :src="selectedImage"></v-img>
                              </template>
                              <v-list>
                                 <v-list-item @click="deleteAvatar">
                                    <span>{{ $t('accounts.newProfile.deleteAvatar') }} 
                                    <v-btn
                                    class="ma-0" 
                                    density="comfortable" 
                                    color="error" variant="text" icon="mdi-delete"></v-btn></span>
                                 </v-list-item>
                              </v-list>
                           </v-menu>
                        </template>
                        <template v-else>
                           <v-icon @click="onTriggerUploader" size="40" icon="mdi-account-edit"></v-icon>
                        </template>
                     </v-avatar>
                  </v-hover>
               </v-col>
               <v-col cols="12" sm="10">
                  <v-text-field
                  :hide-details="true" 
                  :label="$t('accounts.newProfile.username')" 
                  variant="outlined"></v-text-field>
               </v-col>
               <v-col cols="12">
                  <v-divider class="rounded my-2" :thickness="2"></v-divider>
               </v-col>
            </v-row>
            <v-row>
               <v-col class="d-flex" cols="6" md="4">
                  <v-btn>{{ $t('accounts.newProfile.next') }}</v-btn>
                  <v-btn @click="emit('cancel')" variant="text">{{$t('accounts.newProfile.cancel')}}</v-btn>
               </v-col>
            </v-row>
         </v-container>
      </v-card>
   </v-row>

   <input
   v-show="false"
   type="file"
   @change="selectFile" 
   accept="image/*" 
   ref="uploader">
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const emit = defineEmits(['cancel'])

const menu = ref<boolean>(false)
const uploader = ref<HTMLInputElement | null>(null)
const selectedImage = ref<any>(null)

const onTriggerUploader = (): void => {
   uploader.value?.click()
}

const selectFile = (input: any) => {
   if(!input) return
   const file = input.target.files[0]
   const reader = new FileReader()

   reader.onload = (e) => {
      selectedImage.value = e.target?.result
      console.log(selectedImage.value)
   }
   if(file) {
      reader.readAsDataURL(file)
   }
}

const deleteAvatar = () => {
   selectedImage.value = null
   menu.value = false
}

</script>