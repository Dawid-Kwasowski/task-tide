<template>
  <v-dialog transition="dialog-bottom-transition">
    <v-card>
      <v-card-title :title="title"></v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  prepend-inner-icon="mdi-calendar-month"
                  v-model="date.value.value"
                  :error-messages="date.errorMessage.value"
                  :readonly="true"
                  variant="solo-filled"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  :error-messages="title.errorMessage.value"
                  v-model="title.value.value"
                  :label="$t('home.task.placeholder')"
                  variant="solo-filled"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea
                  :counter="max"
                  :error-messages="description.errorMessage.value"
                  v-model="description.value.value"
                  clearable
                  :label="$t('home.task.description')"
                  prepend-icon="mdi-pencil"
                  variant="solo"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn
                  type="submit"
                  class="mb-2"
                  :text="$t('home.task.addTask')"
                  append-icon="mdi-plus"
                  block
                ></v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type ITaskForm from "./models/ITaskForm";
import { useForm, useField } from "vee-validate";
import { string, object } from "yup";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<ITaskForm>();

const max = 120;

const { handleSubmit } = useForm({
  validationSchema: object({
    date: string()
      .required()
      .test({
        name: "specificDate",
        exclusive: true,
        message: "Changing date is not allowed right now",
        test: (value): boolean =>
          value == null || /\d{1,2}\/\d{1,2}\/\d{2,4}/.test(value),
      }),
    title: string().required(),
    description: string()
      .optional()
      .test({
        name: "maxLen",
        exclusive: true,
        params: { max },
        message: t("app.validationMessages.maxLength"),
        test: (value): boolean => value == null || value.length <= max,
      }),
  }),
  initialValues: {
    date: props.date,
  },
});

const submit = handleSubmit((values, { resetForm }) => {
  resetForm();
});

const title = useField("title");
const description = useField("description");
const date = useField("date");
</script>

<style scoped></style>
