<template>
  <v-app>
    <navigation v-if="router.currentRoute.value.name === 'Home'"></navigation>
    <v-main>
      <router-view></router-view>
    </v-main>
    <toast/>
  </v-app>
</template>

<script setup lang="ts">
import Navigation from './components/Navigation/Navigation.vue'
import Toast from './components/Toast/Toast.vue'
import { useRouter } from "vue-router"

const router = useRouter()
</script>
