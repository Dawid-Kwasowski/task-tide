<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useForm } from "vee-validate";
import { object, string, ref as yupRef } from "yup";
import { useAuthUser } from "@/composables/UseAuthUser";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";

const { t } = useI18n();

const router = useRouter();

const { updatePassword } = useAuthUser();

const toggleIcons = ref(false);

const toggleEyes = computed(() => {
  return toggleIcons.value ? "mdi-eye" : "mdi-eye-off";
});

const togglePassword = computed(() => {
  return toggleIcons.value ? "text" : "password";
});

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: object({
    password: string()
      .required(t("app.validationMessages.required"))
      .test(
        "len",
        t("app.validationMessages.minLength", 6),
        (value) => value.length >= 6,
      ),
    confirmPassword: string()
      .required(t("app.validationMessages.required"))
      .oneOf(
        [yupRef("password"), null],
        t("app.validationMessages.passwordMustMach"),
      ),
  }),
});

const [password, passwordAttr] = defineField("password");
const [confirmPassword, confirmPasswordAttr] = defineField("confirmPassword");

const submit = handleSubmit(async (values) => {
  await updatePassword(values.password as string);
  await router.push({ name: "Auth" });
});
</script>

<template>
  <div class="d-flex justify-center align-center h-screen">
    <v-card min-width="350px" class="pa-3">
      <div class="d-flex justify-space-between align-center">
        <v-card-title>{{ t("updatePassword.t") }}</v-card-title>
        <v-btn
          variant="text"
          @click="toggleIcons = !toggleIcons"
          :icon="toggleEyes"
        ></v-btn>
      </div>
      <v-card-subtitle> {{ t("updatePassword.description") }}</v-card-subtitle>
      <v-card-item>
        <form @submit.prevent="submit">
          <v-text-field
            :error-messages="errors.password"
            v-bind="passwordAttr"
            :type="togglePassword"
            v-model="password"
            :label="t('updatePassword.fields.password')"
            variant="underlined"
          ></v-text-field>

          <v-text-field
            :error-messages="errors.confirmPassword"
            v-bind="confirmPasswordAttr"
            :type="togglePassword"
            v-model="confirmPassword"
            :label="t('updatePassword.fields.confirmPassword')"
            variant="underlined"
          ></v-text-field>
          <div class="d-flex mt-3 ga-2 justify-center">
            <v-btn type="submit" block> {{ t("updatePassword.update") }}</v-btn>
          </div>
        </form>
      </v-card-item>
    </v-card>
  </div>
</template>
