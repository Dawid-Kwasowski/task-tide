<template>
  <v-card max-width="1000" variant="tonal">
    <v-card-title class="text-h4 text-center ma-2">
      {{ t("auth.signIn.t") }}
    </v-card-title>
    <v-divider></v-divider>
    <form-template-component @submit="signInOwner"></form-template-component>

    <v-card-actions class="justify-center">
      <v-btn @click="router.push({ path: '/reset-password' })">
        {{ t("auth.signIn.resetPassword") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import FormTemplateComponent from "@/views/AuthView/components/FormTemplateComponent/FormTemplateComponent.vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useAuthUser } from "@/composables/UseAuthUser";

const { signIn } = useAuthUser();
const router = useRouter();
const { t } = useI18n();

const signInOwner = async (payload: any): Promise<void> => {
  const isAuthenticated = await signIn(payload);
  if (isAuthenticated === "authenticated") {
    await router.push({ path: "/browse" });
  }
};
</script>
