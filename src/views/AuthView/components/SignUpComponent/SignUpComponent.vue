<template>
  <v-card variant="tonal">
    <v-card-title class="text-h4 text-center ma-2">
      {{ t("auth.signUp.t") }}
    </v-card-title>
    <v-divider></v-divider>
    <form-template-component @submit="createAccount"></form-template-component>
  </v-card>
</template>

<script setup lang="ts">
import FormTemplateComponent from "@/views/AuthView/components/FormTemplateComponent/FormTemplateComponent.vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useAuthUser } from "@/composables/UseAuthUser";

const { signUp, signIn } = useAuthUser();
const router = useRouter();
const createAccount = async (payload) => {
  await signUp(payload);
  const isAuthenticated = await signIn(payload);
  if (isAuthenticated === "authenticated") {
    await router.push({ path: "/browse" });
  }
};
const { t } = useI18n();
</script>
