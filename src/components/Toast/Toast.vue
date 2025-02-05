<template>
  <v-snackbar
    :timeout="state.timeout"
    v-model="state.showToast"
    :color="state.color"
  >
    {{ t(state.message || "") }}

    <template #actions>
      <v-btn variant="text" @click="state.showToast = false">
        <v-icon icon="mdi-close"></v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useToastStore } from "@/stores/components/ToastStore/ToastStore";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const toastStore = useToastStore();

const { message, timeout, color, showToast } = storeToRefs(toastStore);

const state = reactive({
  message,
  color,
  showToast,
  timeout,
});
</script>
