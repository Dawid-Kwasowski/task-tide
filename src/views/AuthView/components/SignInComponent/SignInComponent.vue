<template>
  <v-card variant="tonal">
    <v-card-title class="text-h4 text-center ma-2">
      {{ $t("auth.signIn.t") }}
    </v-card-title>
    <v-divider></v-divider>
    <form-template-component @submit="signIn"></form-template-component>
  </v-card>
</template>
<script setup lang="ts">
import FormTemplateComponent from "@/views/AuthView/components/FormTemplateComponent/FormTemplateComponent.vue";
import { useUserStore } from "@/stores/UserStore/UserStore";
import { useRouter } from "vue-router";

const { signInOwner } = useUserStore();
const router = useRouter();

const signIn = async (payload: any): Promise<void> => {
  const isAuthenticated = await signInOwner(payload);
  if (isAuthenticated === "authenticated") {
    router.push({ path: "/browse" });
  }
};
</script>
