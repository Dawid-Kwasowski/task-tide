<script setup lang="ts">
import { useForm } from "vee-validate";
import { object, ref as yupRef, string } from "yup";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const emit = defineEmits<{
  update: [value: any];
}>();

const { t } = useI18n();

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

const passwordIcon = ref(false);
const confirmPasswordIcon = ref(false);

const togglePasswordEyes = computed(() => {
  return passwordIcon.value ? "mdi-eye" : "mdi-eye-off";
});

const toggleConfirmPasswordEyes = computed(() => {
  return confirmPasswordIcon.value ? "mdi-eye" : "mdi-eye-off";
});

const togglePassword = computed(() => {
  return passwordIcon.value ? "text" : "password";
});

const toggleConfirmPassword = computed(() => {
  return confirmPasswordIcon.value ? "text" : "password";
});

const buttonCondition = computed(
  () =>
    !password.value ||
    !confirmPassword.value ||
    Object.entries(errors.value).length > 0,
);

const [password, passwordAttr] = defineField("password");
const [confirmPassword, confirmPasswordAttr] = defineField("confirmPassword");

const submit = handleSubmit(async (values) => {
  emit("update", { password: values.password });
});
</script>

<template>
  <form @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-text-field
          @click:append-inner="passwordIcon = !passwordIcon"
          :append-inner-icon="togglePasswordEyes"
          :error-messages="errors.password"
          v-bind="passwordAttr"
          :type="togglePassword"
          v-model="password"
          :label="t('updatePassword.fields.password')"
          variant="outlined"
        ></v-text-field>
      </v-row>
      <v-row class="mt-5">
        <v-text-field
          @click:append-inner="confirmPasswordIcon = !confirmPasswordIcon"
          :append-inner-icon="toggleConfirmPasswordEyes"
          :error-messages="errors.confirmPassword"
          v-bind="confirmPasswordAttr"
          :type="toggleConfirmPassword"
          v-model="confirmPassword"
          :label="t('updatePassword.fields.confirmPassword')"
          variant="outlined"
        ></v-text-field>
      </v-row>
    </v-container>

    <div class="d-flex mt-3 ga-2 justify-center">
      <v-btn :disabled="buttonCondition" type="submit" block>
        {{ t("updatePassword.update") }}</v-btn
      >
    </div>
  </form>
</template>

<style scoped></style>
