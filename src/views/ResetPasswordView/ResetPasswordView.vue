<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useForm } from "vee-validate";
import { object, string } from "yup";
import { useRoute, useRouter } from "vue-router";
import { useAuthUser } from "@/composables/UseAuthUser";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const { passwordReset } = useAuthUser();

const { handleSubmit, errors, defineField } = useForm({
  initialValues: {
    email: route.params.email || "",
  },
  validationSchema: object({
    email: string()
      .email(t("app.validationMessages.invalidEmail"))
      .required(t("app.validationMessages.required")),
  }),
});

const [email, emailAttrs] = defineField("email");

const submit = handleSubmit(async (values) => {
  await passwordReset(values.email as string);
});
</script>

<template>
  <div class="d-flex justify-center align-center h-screen">
    <v-card class="pa-3">
      <v-card-title>{{ t("resetPassword.t") }}</v-card-title>
      <v-card-subtitle> {{ t("resetPassword.description") }}</v-card-subtitle>
      <v-card-item>
        <form @submit.prevent="submit">
          <v-text-field
            v-model="email"
            v-bind="emailAttrs"
            :error-messages="errors.email"
            :label="t('resetPassword.fields.email')"
            variant="underlined"
          ></v-text-field>
          <div class="d-flex mt-3 ga-2 justify-center">
            <v-btn type="submit"> {{ t("resetPassword.send") }}</v-btn>
            <v-btn @click="router.push({ name: 'Auth' })" variant="text">
              {{ t("resetPassword.back") }}</v-btn
            >
          </div>
        </form>
      </v-card-item>
    </v-card>
  </div>
</template>
