<template>
  <v-menu
    :close-on-content-click="false"
    transition="slide-x-transition"
    :activator="`#menu-activator-${index}`"
  >
    <v-card
      class="my-2"
      :title="t('auth.editProfiles.management')"
      min-width="300"
    >
      <v-divider></v-divider>

      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              :error-message="username.errorMessage.value"
              color="warning"
              @click:append="editName"
              v-model="username.value.value"
              append-icon="mdi-pencil"
              :label="t('auth.editProfiles.editName')"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn @click="open">
              {{ t("auth.editProfiles.editAvatar") }}
            </v-btn>
          </v-col>
          <v-col>
            <v-btn @click="removeAvatar(user_id)" color="error">
              <v-icon icon="mdi-image-remove"></v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <v-btn append-icon="mdi-delete" color="error" @click="deleteUser" block>
          {{ t("auth.editProfiles.deleteProfile") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/UserStore/UserStore";
import IUserManagement from "./model/IUserManagamentMenu";
import { useI18n } from "vue-i18n";
import { useFileDialog } from "@vueuse/core";
import { useField, useForm } from "vee-validate";
import { object, string } from "yup";

const store = useUserStore();

const props = defineProps<IUserManagement>();

const { t } = useI18n();

const { open, onChange } = useFileDialog({
  accept: "image/*",
});

onChange((files: any): void => {
  if (!files) return;
  const file = files[0];
  const reader = new FileReader();

  reader.onload = (evt) => {
    store.editAvatar(props.user_id, evt.target?.result);
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

const { handleSubmit } = useForm({
  validationSchema: object({
    username: string().required(),
  }),
  initialValues: {
    username: props.username,
  },
});

const removeAvatar = (user_id: string): void => {
  store.removeAvatar(user_id);
};

const deleteUser = (): void => {
  store.removeUser(`${props.user_id}`);
};

const username = useField("username");

const editName = handleSubmit((values): void => {
  store.editUsername(props.user_id, values.username);
});
</script>
