<template>
   <div class="d-flex align-center h-100">
      <v-container>   
         <v-row>
            <v-col>
               <h1 class="text-center text-h2 my-5">{{$t('accounts.chooseProfile')}}</h1>
            </v-col>
         </v-row>
         <v-row justify="center">
            <v-col cols="2" class="d-flex justify-center">
               <!-- <v-avatar color="surface-variant" size="80"></v-avatar> -->
               <div class="d-flex align-center flex-column">
               <v-btn variant="tonal" class="text-h4" color="primary" size="100" icon="$plus"></v-btn>
               <span class="text-center mt-5">{{$t('accounts.createProfile')}}</span>
               </div>
            </v-col>
         </v-row>
      </v-container>
   </div>
   
   
</template>

<script lang="ts" setup>

</script>