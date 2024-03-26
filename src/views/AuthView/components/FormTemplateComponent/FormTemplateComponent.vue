<template>
   <v-form @submit.prevent="submit">
      <v-container>
         <v-row justify="center">
            <v-col cols="12" sm="8">
               <v-text-field
                  type="email"
                  v-model="email.value.value"
                  :error-messages="email.errorMessage.value"
                  :label="$t('auth.email')"
                  variant="underlined"
               ></v-text-field>
            </v-col>
            <v-col cols="12" sm="8">
               <v-text-field
                  v-model="password.value.value"
                  :error-messages="password.errorMessage.value"
                  :label="$t('auth.password')"
                  variant="underlined"
                  type="password"
               ></v-text-field>
            </v-col>
            <v-col cols="12" sm="8">
               <v-btn :disabled="buttonCondition" block @click="submit">Dalej</v-btn>
            </v-col>
         </v-row>
      </v-container>
   </v-form>
</template>
<script setup lang="ts">

import { defineEmits, computed } from "vue"
import { useI18n } from "vue-i18n"
import { useForm, useField, useIsFieldDirty, useIsFieldValid } from "vee-validate"
import { emailExpression } from "@/validators/email"

const { t } = useI18n()


const emit = defineEmits(['submit'])

const { handleSubmit } = useForm({
   validationSchema: {
      email(value: string): string | true {
         if (!value) return t("app.validationMessages.required")
         if (!emailExpression.test(value)) return t('app.validationMessages.invalidEmail') 
         return true
      },
      password(value: string): string | true {
         if (!value) return t("app.validationMessages.required")
         return true
      }
   }
})

const email: any = useField('email')
const password: any = useField('password')

const isEmailDirty = useIsFieldDirty("email")
const isEmailValid = useIsFieldValid("email")

const isPasswordDirty = useIsFieldDirty("password")
const isPasswordValid = useIsFieldValid("password")

const buttonCondition = computed((): boolean => (!isEmailDirty.value || !isEmailValid.value) || (!isPasswordDirty.value || !isPasswordValid.value))

const submit = handleSubmit((values: any) => {
   console.log('submit', values)
   emit('submit', values)
})

</script>