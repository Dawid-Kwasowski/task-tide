<script setup lang="ts">
import { useForm } from "vee-validate";
import { object, string } from "yup";
import { useI18n } from "vue-i18n";
import { IUpdateEmailFormProps } from "@/views/AccountView/components/UpdateEmailForm/model/IUpdateEmailFormProps";

const emit = defineEmits<{
  update: [value: any];
}>();

const props = defineProps<IUpdateEmailFormProps>();

const { t } = useI18n();
const { defineField, errors, handleSubmit } = useForm({
  initialValues: {
    email: props?.email || "",
  },
  validationSchema: object({
    email: string()
      .email(t("app.validationMessages.invalidEmail"))
      .required(t("app.validationMessages.required")),
  }),
});

const [email, emailAttr] = defineField("email");

const submit = handleSubmit(async (values: any) => {
  emit("update", { email: values.email });
});
</script>

<template>
  <form @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            :error-messages="errors.email"
            :label="t('account.sections.email.field')"
            variant="outlined"
            v-model="email"
            v-bind="emailAttr"
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="d-flex mt-3 ga-2 justify-center">
        <v-btn type="submit" block> {{ t("updatePassword.update") }}</v-btn>
      </div>
    </v-container>
  </form>
</template>
