<template>
  <v-form @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            prepend-inner-icon="mdi-calendar-month"
            v-model="deadline"
            v-bind="deadlineAttrs"
            :readonly="true"
            variant="solo-filled"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            :error-messages="errors.title"
            v-bind="emailAttrs"
            v-model="title"
            :label="$t('home.task.placeholder')"
            variant="solo-filled"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea
            :counter="max"
            :error-messages="errors.description"
            v-model="description"
            v-bind="descriptionAttrs"
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
            :text="
              $t(props.editMode ? 'home.task.editMode' : 'home.task.addTask')
            "
            :append-icon="props.editMode ? 'mdi-pencil' : 'mdi-plus'"
            block
          ></v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type ITaskForm from "./models/ITaskForm";
import type { ITodo } from "@/models/ITodo";
import { useForm } from "vee-validate";
import { string, object } from "yup";
import { useI18n } from "vue-i18n";
import { useCalendarStore } from "@/stores/CalendarStore/CalendarStore";

const { t } = useI18n();

const { addTask, editTask } = useCalendarStore();

const props = withDefaults(defineProps<ITaskForm>(), {
  editMode: false,
});

const emit = defineEmits(["edit"]);

const max = 120;

const { handleSubmit, errors, defineField } = useForm({
  initialValues: {
    deadline: props.deadline,
    title: props.title || "",
    description: props.description || "",
  },
  validationSchema: object({
    deadline: string()
      .required("Deadline is required")
      .test({
        name: "specificDate",
        exclusive: true,
        message: "Changing date is not allowed right now",
        test: (value): boolean =>
          value == null || /\d{2,4}-\d{1,2}-\d{1,4}/.test(value),
      }),
    title: string().required("Title is required"),
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
  const { description, title } = values;
  const { editMode, id, creator_id } = props;

  try {
    const payload: ITodo = {
      ...values,
      created_at: new Date().toISOString(),
      creator_id,
      status: "todo",
    };

    if (editMode && id) {
      await editTask({ id, description, title });
      emit("edit");
    } else {
      await addTask(payload);
      resetForm();
    }
  } catch (error) {
    console.error("Error while submitting the task:", error);
  }
});

const [title, emailAttrs] = defineField("title");
const [description, descriptionAttrs] = defineField("description");
const [deadline, deadlineAttrs] = defineField("deadline");
</script>
