<template>
  <v-row justify="center">
    <v-card elevation="5" variant="tonal" color="primary" class="pa-2">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card-title class="text-h3">{{ $t("accounts.newProfile.t") }}</v-card-title>
          </v-col>
          <v-col cols="12">
            <v-card-subtitle class="text-wrap">{{
              $t("accounts.newProfile.subtitle")
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
                      >
                        <template #append>
                          <v-btn
                            class="ma-0"
                            density="comfortable"
                            :color="item.color"
                            variant="text"
                            :icon="item.icon"
                          ></v-btn>
                        </template>
                        <v-list-item-title v-text="item.text"></v-list-item-title>
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
                :label="$t('accounts.newProfile.username')"
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
            <v-btn @click="addNewProfile" :disabled="!isNameDirty || !isNameValid">{{
              $t("accounts.newProfile.next")
            }}</v-btn>
            <v-btn @click="cancel" variant="text">{{
              $t("accounts.newProfile.cancel")
            }}</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-row>

  <template v-show="false">
    <input type="file" @change="selectFile" accept="image/*" ref="uploader"
  /></template>
</template>
<script lang="ts" setup>
// imports

import { ref } from "vue"
import { useI18n } from "vue-i18n"
import IMenuItem from "./models/IMenuItem"
import { useField, useForm, useIsFieldDirty, useIsFieldValid } from "vee-validate"
import { useUserStore } from "@/stores/UserStore/UserStore"
import { useRouter } from "vue-router"
import { useToastStore } from "@/stores/components/ToastStore/ToastStore"
// imports end

// composables

const { t } = useI18n()
const { addNewUser, saveUserInfo } = useUserStore()
const { show } = useToastStore()
const router = useRouter()

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value: string): string | true {
      if (!value) return t("app.validationMessages.required")
      if (value?.length > 20) return t("app.validationMessages.maxLength", { count: 20 })
      return true
    },
  },
})

// composables end

const emit = defineEmits(["cancel"])

const name: any = useField("name")

const isNameDirty = useIsFieldDirty("name")
const isNameValid = useIsFieldValid("name")

const menu = ref<boolean>(false)
const uploader = ref<HTMLInputElement | null>(null)
const selectedImage = ref<any>(null)

const onTriggerUploader = (): void => {
  uploader.value?.click()
}

const selectFile = (input: any): void => {
  if (!input) return
  const file = input.target.files[0]
  const reader = new FileReader()

  reader.onload = (e): void => {
    if (!e.target?.result) return
    selectedImage.value = e.target?.result
    if (menu.value) menu.value = false
  }

  if (file) {
    reader.readAsDataURL(file)
  }
}

const deleteAvatar = (): void => {
  selectedImage.value = null
  menu.value = false
}

const submit = handleSubmit((values: any): void => {
  Object.assign(values, { avatar: selectedImage.value })
  addNewUser(values)
})

const cancel = (): void => {
  selectedImage.value = null
  handleReset()
  emit("cancel")
}

const addNewProfile = async (): Promise<void> => {
  try {
    const result = await addNewUser({
      avatar: selectedImage.value,
      name: name.value.value,
    })

    if (result) {
      await saveUserInfo(result)
      router.push({ path: "/" })
    }
  } catch (err: any) {
    console.error(err.message)

    await show({
      color: "danger",
      message: err.message,
      timeout: 3000,
    })
  }
}
const menuItems: IMenuItem[] = [
  {
    text: t("accounts.newProfile.editPhoto"),
    icon: "mdi-pencil",
    color: "warning",
    action: onTriggerUploader,
  },
  {
    text: t("accounts.newProfile.deleteAvatar"),
    icon: "mdi-delete",
    color: "error",
    action: deleteAvatar,
  },
]
</script>
