<script setup lang="ts">
const dialog = defineModel<boolean>();
</script>

<template>
  <v-dialog v-model="dialog" transition="dialog-bottom-transition">
    <v-card>
      <v-card-title class="text-center">
        <slot name="header"></slot>
      </v-card-title>
      <v-card-text>
        <slot>
          <slot name="content"></slot>
        </slot>
      </v-card-text>
      <v-card-actions>
        <slot name="actions"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
