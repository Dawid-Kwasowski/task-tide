<script setup lang="ts">
import { useI18n } from "vue-i18n";
import UpdatePasswordForm from "@/views/AccountView/components/UpdatePasswordForm/UpdatePasswordForm.vue";
import { useAuthUser } from "@/composables/UseAuthUser";
import router from "@/router";
const { t } = useI18n();

const { updateUser } = useAuthUser();

const update = async (values: any) => {
  await updateUser(values);
  await router.push({ name: "Auth" });
};
</script>

<template>
  <div class="d-flex justify-center align-center h-screen">
    <v-card min-width="350px" class="pa-3">
      <div class="d-flex justify-space-between align-center">
        <v-card-title>{{ t("updatePassword.t") }}</v-card-title>
      </div>
      <v-card-subtitle> {{ t("updatePassword.description") }}</v-card-subtitle>
      <v-card-item>
        <update-password-form @update="update" />
      </v-card-item>
    </v-card>
  </div>
</template>
