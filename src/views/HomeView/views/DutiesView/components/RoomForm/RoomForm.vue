<script setup lang="ts">
import { useForm } from "vee-validate";
import { object, string } from "yup";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/stores/UserStore/UserStore";
import { storeToRefs } from "pinia";
import { useRoomStore } from "@/stores/RoomStore/RoomStore";
import { IRoomFormProps } from "@/views/HomeView/views/DutiesView/components/RoomForm/model/IRoomFormProps";

const props = withDefaults(defineProps<IRoomFormProps>(), {
  editMode: false,
});

const { t } = useI18n();

const { defineField, errors, handleSubmit } = useForm({
  initialValues: {
    name: props.room?.name || "",
    profile: props.room?.user_id || "",
  },
  validationSchema: object({
    name: string().required(t("app.validationMessages.required")),
    profile: string().required(t("app.validationMessages.required")),
  }),
});

const profilesStore = useUserStore();
const roomStore = useRoomStore();

const { userList } = storeToRefs(profilesStore);

const [name, nameAttr] = defineField("name");
const [profile, profilesAttr] = defineField("profile");

const submit = handleSubmit(async (values, { resetForm }) => {
  if (props.editMode) {
    await roomStore.editRoom({
      name: values.name,
      user_id: values.profile,
      room_id: props.room?.room_id || "",
    });
  } else {
    await roomStore.addRoom({ name: values.name, user_id: values.profile });
    resetForm();
  }
});
</script>

<template>
  <form @submit.prevent="submit">
    <div>
      <v-text-field
        v-model="name"
        :error-messages="errors.name"
        :label="t('home.duty.roomForm.name')"
        v-bind="nameAttr"
        variant="solo"
      ></v-text-field>
    </div>
    <div>
      <v-select
        :error-messages="errors.profile"
        clearable
        v-bind="profilesAttr"
        item-title="username"
        item-value="user_id"
        :items="userList"
        variant="solo"
        :label="t('home.duty.roomForm.profiles')"
        v-model="profile"
      >
      </v-select>
    </div>
    <div>
      <v-btn type="submit" block>
        {{
          props.editMode
            ? t("home.duty.dutyForm.edit")
            : t("home.duty.dutyForm.add")
        }}</v-btn
      >
    </div>
  </form>
</template>
