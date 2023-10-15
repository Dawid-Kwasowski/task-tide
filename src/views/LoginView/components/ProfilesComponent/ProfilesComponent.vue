<template>   
   <v-row>
      <v-col>
         <h1 class="text-center text-h2 my-5">{{$t('accounts.chooseProfile')}}</h1>
      </v-col>
   </v-row>
   <v-row justify="center">
      <v-col cols="2" class="d-flex justify-center">
         <!-- <v-avatar color="surface-variant" size="80"></v-avatar> -->
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
   </v-row>
</template>

<script lang="ts" setup>

const emit = defineEmits(['createProfile'])

</script>