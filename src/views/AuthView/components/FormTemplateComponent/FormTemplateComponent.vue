<template>
  <v-form @submit.prevent="submit">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8">
          <v-text-field
            type="email"
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            :label="$t('auth.email')"
            variant="underlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="8">
          <v-text-field
            @click:append-inner="toggleIcons = !toggleIcons"
            :append-inner-icon="toggleEyes"
            v-model="password.value.value"
            :error-messages="password.errorMessage.value"
            :label="$t('auth.password')"
            variant="underlined"
            :type="togglePassword"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="8">
          <v-btn :disabled="buttonCondition" block type="submit">Dalej</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script setup lang="ts">
import { defineEmits, computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import {
  useForm,
  useField,
  useIsFieldDirty,
  useIsFieldValid,
} from "vee-validate";
import { object, string } from "yup";

const { t } = useI18n();

const emit = defineEmits(["submit"]);

const { handleSubmit } = useForm({
  validationSchema: object({
    email: string()
      .email(t("app.validationMessages.invalidEmail"))
      .required(t("app.validationMessages.required")),
    password: string().required(t("app.validationMessages.required")),
  }),
});

const email: any = useField("email");
const password: any = useField("password");

const isEmailDirty = useIsFieldDirty("email");
const isEmailValid = useIsFieldValid("email");

const isPasswordDirty = useIsFieldDirty("password");
const isPasswordValid = useIsFieldValid("password");

const buttonCondition = computed(
  (): boolean =>
    !isEmailDirty.value ||
    !isEmailValid.value ||
    !isPasswordDirty.value ||
    !isPasswordValid.value,
);

const submit = handleSubmit((values: any) => {
  emit("submit", values);
});

const toggleIcons = ref(false);

const toggleEyes = computed(() => {
  return toggleIcons.value ? "mdi-eye" : "mdi-eye-off";
});

const togglePassword = computed(() => {
  return toggleIcons.value ? "text" : "password";
});
</script>
