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
              :error-message="errors.username"
              color="warning"
              @click:append="editName"
              v-bind="usernameAttr"
              v-model="username"
              append-icon="mdi-pencil"
              :label="t('auth.editProfiles.editName')"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="my-0">
          <v-col>
            <v-btn block @click="open">
              {{
                props.avatar_url
                  ? t("auth.editProfiles.editAvatar")
                  : t("auth.editProfiles.addAvatar")
              }}
            </v-btn>
          </v-col>

          <template v-if="props.avatar_url">
            <v-col>
              <v-btn @click="removeAvatar(user_id)" color="error">
                <v-icon icon="mdi-image-remove"></v-icon>
              </v-btn>
            </v-col>
          </template>
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
import IUserManagement from "./model/IUserManagementMenu";
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

  reader.onload = (evt: any) => {
    store.updateAvatar(props.user_id, evt?.target?.result);
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: object({
    username: string()
      .required(t("app.validationMessages.required"))
      .test(
        "len",
        t("app.validationMessages.minLength", 3),
        (value) => value.length >= 3,
      )
      .test(
        "maxLen",
        t("app.validationMessages.maxLength", 20),
        (value) => value.length <= 20,
      ),
  }),
  initialValues: {
    username: props.username,
  },
});

const removeAvatar = (user_id: string): void => {
  store.updateAvatar(user_id, null);
};

const deleteUser = (): void => {
  store.deleteUser(`${props.user_id}`);
};

const [username, usernameAttr] = defineField("username");

const editName = handleSubmit((values): void => {
  store.updateUsername(props.user_id, values.username.trim());
});
</script>
