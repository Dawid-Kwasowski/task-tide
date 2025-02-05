<template>
  <v-row justify="center">
    <v-card elevation="5" variant="tonal" color="primary" class="pa-2">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card-title class="text-h3">{{
              t("profiles.newProfile.t")
            }}</v-card-title>
          </v-col>
          <v-col cols="12">
            <v-card-subtitle class="text-wrap">{{
              t("profiles.newProfile.subtitle")
            }}</v-card-subtitle>
          </v-col>
          <v-col cols="12">
            <v-divider class="rounded my-2" :thickness="2"></v-divider>
          </v-col>
        </v-row>
        <v-row align="center" justify="space-around">
          <v-col cols="12" sm="2" class="d-flex justify-center">
            <v-hover #="{ isHovering, props }">
              <v-avatar
                :variant="!isHovering ? 'tonal' : 'elevated'"
                v-bind="props"
                color="surface-variant"
                size="80"
              >
                <template v-if="selectedImage">
                  <v-menu v-model="menu" :close-on-content-click="false">
                    <template #activator="{ props }">
                      <v-img v-bind="props" :src="selectedImage"></v-img>
                    </template>
                    <v-list elevation="20" class="mt-2">
                      <v-list-item
                        v-for="(item, index) in menuItems"
                        :key="index"
                        class="d-flex justify-between"
                        @click="item.action"
                        :title="item.text"
                      >
                        <template #prepend>
                          <v-btn
                            class="ma-0"
                            density="comfortable"
                            :color="item.color"
                            variant="text"
                            :icon="item.icon"
                          ></v-btn>
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </template>
                <template v-else>
                  <v-icon
                    @click="onTriggerUploader"
                    size="40"
                    icon="mdi-account-edit"
                  ></v-icon>
                </template>
              </v-avatar>
            </v-hover>
          </v-col>
          <v-col cols="12" sm="10">
            <v-form @submit.prevent="submit">
              <v-text-field
                density="compact"
                clearable
                counter
                v-model="name.value.value"
                :error-messages="name.errorMessage.value"
                :label="t('profiles.newProfile.username')"
                variant="underlined"
              ></v-text-field>
            </v-form>
          </v-col>
          <v-col cols="12">
            <v-divider class="rounded my-2" :thickness="2"></v-divider>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex" cols="6" md="4">
            <v-btn
              @click="addNewProfile"
              :disabled="!isNameDirty || !isNameValid"
              >{{ t("profiles.newProfile.next") }}</v-btn
            >
            <v-btn @click="cancel" variant="text">{{
              t("profiles.newProfile.cancel")
            }}</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-row>

  <div v-show="false">
    <input type="file" @change="selectFile" accept="image/*" ref="uploader" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import IMenuItem from "./models/IMenuItem";
import {
  useField,
  useForm,
  useIsFieldDirty,
  useIsFieldValid,
} from "vee-validate";
import { useUserStore } from "@/stores/UserStore/UserStore";

const { t } = useI18n();
const { addUser } = useUserStore();

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value: string): string | true {
      if (!value) return t("app.validationMessages.required");
      if (value?.length > 20)
        return t("app.validationMessages.maxLength", { count: 20 });
      return true;
    },
  },
});

const emit = defineEmits(["cancel"]);

const name: any = useField("name");

const isNameDirty = useIsFieldDirty("name");
const isNameValid = useIsFieldValid("name");

const menu = ref<boolean>(false);
const uploader = ref<HTMLInputElement | null>(null);
const selectedImage = ref<any>(null);

const onTriggerUploader = (): void => {
  uploader.value?.click();
};

const selectFile = (input: any): void => {
  if (!input) return;
  const file = input.target.files[0];
  const reader = new FileReader();

  reader.onload = (e): void => {
    if (!e.target?.result) return;
    selectedImage.value = e.target?.result;
    if (menu.value) menu.value = false;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
};

const deleteAvatar = (): void => {
  selectedImage.value = null;
  menu.value = false;
};

const submit = handleSubmit(async (values: any) => {
  Object.assign(values, { avatar: selectedImage.value });
  await addUser(values);
  emit("cancel");
});

const cancel = (): void => {
  selectedImage.value = null;
  handleReset();
  emit("cancel");
};

const addNewProfile = async (): Promise<void> => {
  await addUser({
    avatar_url: selectedImage.value,
    username: name.value.value,
  });
  emit("cancel");
};
const menuItems: IMenuItem[] = [
  {
    text: t("profiles.newProfile.editPhoto"),
    icon: "mdi-pencil",
    color: "warning",
    action: onTriggerUploader,
  },
  {
    text: t("profiles.newProfile.deleteAvatar"),
    icon: "mdi-delete",
    color: "error",
    action: deleteAvatar,
  },
];
</script>
