<template>
  <v-card variant="tonal">
    <v-card-title class="text-h4 text-center ma-2">
      {{ $t("auth.signUp.t") }}
    </v-card-title>
    <v-divider></v-divider>
    <form-template-component @submit="signUp"></form-template-component>
  </v-card>
</template>

<script setup lang="ts">
import FormTemplateComponent from "@/views/AuthView/components/FormTemplateComponent/FormTemplateComponent.vue"
import { useUserStore } from "@/stores/UserStore/UserStore"

const { singUpOwner } = useUserStore()

const signUp = (payload: any): void => {
  singUpOwner(payload)
};
</script>