<template>
  <v-responsive>
    <v-app>
      <v-main>
        <router-view></router-view>
        <toast />
      </v-main>
    </v-app>
  </v-responsive>
</template>
<script setup lang="ts">
import Toast from "@/components/Toast/Toast.vue";
</script>
