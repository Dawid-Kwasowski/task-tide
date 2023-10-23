<template>
  <v-snackbar :timeout="state.timeout" v-model="state.showToast" :color="state.color">
    {{ state.message }}

    <template #actions>
      <v-btn variant="text" @click="state.showToast = false">
        <v-icon icon="mdi-close"></v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import {reactive} from "vue"
import { useToastStore } from "@/stores/components/ToastStore/ToastStore"


const {
  message,
  timeout,
  color, 
  showToast
} = useToastStore()

const state = reactive({
  message,
  color,
  showToast,
  timeout
})


</script>
