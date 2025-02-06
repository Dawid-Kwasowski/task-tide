<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="10" lg="6">
          <v-card max-width="1000" elevation="5">
            <div class="pa-2 d-flex justify-center">
              <v-avatar class="elevation-20" size="150">
                <v-img cover src="@/assets/images/TaskTide-logos.jpeg"></v-img>
              </v-avatar>
            </div>
            <v-tabs fixed-tabs grow v-model="tab">
              <v-tab value="signInTab">
                {{ t("auth.signInTab") }}
              </v-tab>
              <v-tab value="signUpTab">
                {{ t("auth.signUpTab") }}
              </v-tab>
            </v-tabs>
            <v-divider :thickness="10"></v-divider>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="10" lg="6">
          <v-window v-model="tab">
            <v-window-item value="signInTab">
              <sign-in-component></sign-in-component>
            </v-window-item>
            <v-window-item value="signUpTab">
              <sign-up-component></sign-up-component>
            </v-window-item>
          </v-window>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="10" lg="6">
          <v-btn
            id="language-activator"
            :text="t('app.translateButton')"
            append-icon="mdi-translate"
            location="bottom center"
            variant="flat"
          ></v-btn>

          <language-menu />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import SignUpComponent from "./components/SignUpComponent/SignUpComponent.vue";
import SignInComponent from "./components/SignInComponent/SignInComponent.vue";
import { useI18n } from "vue-i18n";
import LanguageMenu from "@/components/LanguageMenu/LanguageMenu.vue";
const tab = ref(null);
const { t } = useI18n();
</script>
