<template>
  <v-navigation-drawer>
    <v-list>
      <div class="pa-2">
        <v-list-item :prepend-avatar="user?.avatar" :title="user?.name"></v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/UserStore/UserStore";

const { user } = useUserStore();
// const items: any[] = [
//    {title: ''}
// ]
</script>
