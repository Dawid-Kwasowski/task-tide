<script setup lang="ts">
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useAuthUser } from "@/composables/UseAuthUser";
import UpdatePasswordForm from "@/views/AccountView/components/UpdatePasswordForm/UpdatePasswordForm.vue";
import UpdateEmailForm from "@/views/AccountView/components/UpdateEmailForm/UpdateEmailForm.vue";
import { ref } from "vue";

const router = useRouter();
const { t } = useI18n();

const { updateUser } = useAuthUser();
const user = ref(JSON.parse(localStorage.getItem("auth_key") || "")?.user);
</script>

<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="2">
          <div class="ma-5 d-flex">
            <v-btn
              @click="router.push({ name: 'Browse' })"
              variant="text"
              icon="mdi-arrow-left"
            ></v-btn>
          </div>
        </v-col>
        <v-col>
          <h1 class="text-h2 my-5">{{ t("account.t") }}</h1>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="6">
          <v-card>
            <v-card-item>
              <update-email-form
                @update="(v) => updateUser(v)"
                :email="user.email"
              />
            </v-card-item>
            <v-divider />
            <v-card-item>
              <update-password-form @update="(v) => updateUser(v)" />
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-fab
      variant="tonal"
      absolute
      location="top center"
      icon="mdi-account-remove"
      color="red"
    ></v-fab>
  </div>
</template>
