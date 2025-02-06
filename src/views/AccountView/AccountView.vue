<script setup lang="ts">
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useAuthUser } from "@/composables/UseAuthUser";
import UpdatePasswordForm from "@/views/AccountView/components/UpdatePasswordForm/UpdatePasswordForm.vue";
import UpdateEmailForm from "@/views/AccountView/components/UpdateEmailForm/UpdateEmailForm.vue";
import { computed, ref } from "vue";
import ConfirmDialog from "@/components/ConfirmDialog/ConfirmDialog.vue";

const router = useRouter();
const { t } = useI18n();

const { updateUser, deleteUser, signOut } = useAuthUser();
const user = ref(JSON.parse(localStorage.getItem("auth_key") || "")?.user);

const confirmDialog = ref(false);

const email = ref(null);

const isMatch = computed(() => email.value === user.value?.email);

const openConfirmDialog = () => (confirmDialog.value = true);

const handleDelete = async () => {
  await deleteUser();
  await signOut();
  await router.push({ name: "Auth" });
};
</script>

<template>
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
      <v-col cols="12" md="6">
        <v-card>
          <v-card-item>
            <update-email-form
              @update="(v) => updateUser(v)"
              :email="user.email"
            />
          </v-card-item>
          <v-divider />
          <v-card-item>
            <update-password-form
              @update="
                (v) =>
                  updateUser(
                    v,
                    'account.sections.password.notification.success',
                  )
              "
            />
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-btn
    class="my-2"
    @click="openConfirmDialog"
    variant="tonal"
    location="top center"
    icon="mdi-account-remove"
    color="red"
  ></v-btn>

  <confirm-dialog
    @confirm="handleDelete"
    :confirm-disabled="!isMatch"
    width="500"
    @close="confirmDialog = false"
    :title="t('account.confirmDialog.t')"
    v-model="confirmDialog"
  >
    <v-form>
      <div class="text-body-2">
        {{ t("account.confirmDialog.description") }}
        <span class="font-weight-black">{{ user.email }}</span>
      </div>
      <v-text-field
        density="compact"
        v-model="email"
        variant="outlined"
      ></v-text-field>
    </v-form>
  </confirm-dialog>
</template>
