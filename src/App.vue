<template>
  <v-responsive>
    <v-app>
      <!-- <navigation v-if="router.currentRoute.value.name === 'Home'"></navigation> -->
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-app>
    <v-footer>Beta Version: 1.0.0</v-footer>
  </v-responsive>
</template>

<script setup lang="ts"></script>
