<script setup lang="ts">
import type IConfirmDialog from "@/components/ConfirmDialog/model/IConfirmDialog";

const dialog = defineModel<boolean>();

const props = withDefaults(defineProps<IConfirmDialog>(), {
  width: 350,
});

const emit = defineEmits(["confirm", "close"]);
</script>

<template>
  <v-dialog :max-width="props.width" v-model="dialog">
    <v-card class="pa-2">
      <v-card-title>
        <span class="text-wrap"> {{ props.title }} </span>
      </v-card-title>
      <v-card-item>
        <span class="text-wrap">{{ props.content }}</span>
      </v-card-item>
      <v-card-actions>
        <v-btn @click="emit('close')" variant="text">{{
          $t("components.confirmDialog.cancel")
        }}</v-btn>
        <v-btn @click="emit('confirm')" variant="elevated">
          {{ $t("components.confirmDialog.delete") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
