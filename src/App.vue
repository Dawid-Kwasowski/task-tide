<template>
  <v-responsive>
    <v-app>
      <!-- <navigation v-if="router.currentRoute.value.name === 'Home'"></navigation> -->
      <v-main>
        <router-view></router-view>
      </v-main>
      <toast />
    </v-app>
    <v-footer>Beta Version: 1.1.0</v-footer>
  </v-responsive>
</template>
<script setup lang="ts">
import Toast from "@/components/Toast/Toast.vue";
</script>
