<template>
  <v-form @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            prepend-inner-icon="mdi-calendar-month"
            v-model="deadline"
            :readonly="true"
            variant="solo-filled"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="title.value"
            :label="$t('home.task.placeholder')"
            variant="solo-filled"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea
            :counter="max"
            v-model="description.value"
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
</template>

<script setup lang="ts">
import { computed, defineProps, reactive } from "vue";
import type ITaskForm from "./models/ITaskForm";
import type { ITodo } from "@/models/ITodo";
import { useForm, useField } from "vee-validate";
import { string, object } from "yup";
import { useI18n } from "vue-i18n";
import { useCalendarStore } from "@/stores/CalendarStore/CalendarStore";

const { t } = useI18n();

const { addTask } = useCalendarStore();

const props = withDefaults(defineProps<ITaskForm>(), {
  editMode: false,
});

const max = 120;

const { handleSubmit } = useForm({
  validationSchema: object({
    deadline: string()
      .required()
      .test({
        name: "specificDate",
        exclusive: true,
        message: "Changing date is not allowed right now",
        test: (value): boolean =>
          value == null || /\d{2,4}-\d{1,2}-\d{1,4}/.test(value),
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
});

const submit = handleSubmit(async (values, { resetForm }) => {
  try {
    const payload: ITodo = {
      ...values,
      created_at: new Date().toISOString(),
      creator_id: props.creator_id,
      status: "todo",
    };
    if (props.editMode) {
      console.log(values);
    } else {
      await addTask(payload);
    }
    resetForm();
  } catch (error) {
    console.log(error);
  }
});

const title = reactive(
  useField(
    "title",
    {},
    {
      initialValue: props.title,
    },
  ),
);

const description = reactive(
  useField(computed(() => props.description || "CYCOLONKI")),
);
const deadline = reactive(
  useField(computed(() => props.deadline || "CYCOLONKI")),
);
</script>
