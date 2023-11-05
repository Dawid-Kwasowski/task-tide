<template>
   <v-container>
      <v-row>
         <span class="text-h2">Hello {{ user?.name }}</span>
      </v-row>
   </v-container>
</template>

<script lang="ts" setup>
   import { useUserStore } from '@/stores/UserStore/UserStore';

   const { user } = useUserStore()
</script>
