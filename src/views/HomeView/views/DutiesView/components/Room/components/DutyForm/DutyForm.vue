<script setup lang="ts">
import { useForm } from "vee-validate";
import { object, string } from "yup";
import { useI18n } from "vue-i18n";
import { useRoomStore } from "@/stores/RoomStore/RoomStore";
import { IDutyFormProps } from "@/views/HomeView/views/DutiesView/components/Room/components/DutyForm/model/IDutyFormProps";

const roomStore = useRoomStore();

const props = withDefaults(defineProps<IDutyFormProps>(), {
  edit_mode: false,
});

const { t } = useI18n();

const { defineField, errors, handleSubmit } = useForm({
  initialValues: {
    title: props.duty?.title || "",
    description: props.duty?.description || "",
  },
  validationSchema: object({
    title: string().required(),
    description: string(),
  }),
});

const [title, titleAttr] = defineField("title");
const [description, descriptionAttr] = defineField("description");

const submit = handleSubmit(async (values, { resetForm }) => {
  const payload = {
    title: values.title,
    description: values.description,
    ...(props.edit_mode && { id: props.duty?.id }),
    ...(!props.edit_mode && { room_id: props.room_id }),
  };

  if (props.edit_mode) {
    await roomStore.editDuty(payload);
  } else {
    await roomStore.addDutyToRoom(payload);
  }
  resetForm();
});
</script>

<template>
  <form @submit.prevent="submit">
    <div>
      <v-text-field
        v-model="title"
        :error-message="errors.title"
        :label="t('home.duty.dutyForm.title')"
        v-bind="titleAttr"
        variant="solo"
      ></v-text-field>
    </div>
    <div>
      <v-textarea
        v-model="description"
        :error-message="errors.description"
        :label="t('home.duty.dutyForm.description')"
        v-bind="descriptionAttr"
        variant="solo"
      ></v-textarea>
    </div>
    <div>
      <v-btn type="submit" block>
        {{
          props.edit_mode
            ? t("home.duty.dutyForm.edit")
            : t("home.duty.dutyForm.add")
        }}</v-btn
      >
    </div>
  </form>
</template>
