<script setup lang="ts">
import { useI18n } from "vue-i18n";
import plFlag from "@/assets/images/flags/pl-PL.svg";
import enFlag from "@/assets/images/flags/en-EN.svg";
import { ref } from "vue";
const { locale, availableLocales } = useI18n();

const flagImages: Record<string, { path: string; name: string; code: string }> =
  {
    "pl-PL": {
      code: "pl-PL",
      path: plFlag,
      name: "Polski",
    },
    "en-EN": {
      code: "en-EN",
      path: enFlag,
      name: "English",
    },
  };

const selected = ref([locale]);

const isLocaleSelected = (loc: string) => locale.value === loc;

const selectLocale = (newLocale: string) => {
  locale.value = newLocale;
  localStorage.setItem("locale", locale.value);
};
</script>

<template>
  <v-menu activator="#language-activator" transition="slide-x-transition">
    <v-card class="ma-2">
      <v-card-item>
        <v-list v-model:selected="selected" lines="two">
          <v-list-item
            @click="selectLocale(flagImages[loc].code)"
            :append-icon="
              isLocaleSelected(flagImages[loc].code) ? 'mdi-check' : undefined
            "
            :title="flagImages[loc].name"
            :prepend-avatar="flagImages[loc].path"
            :value="flagImages[loc].code"
            v-for="loc in availableLocales"
            :key="flagImages[loc].code"
          >
          </v-list-item>
        </v-list>
      </v-card-item>
    </v-card>
  </v-menu>
</template>
