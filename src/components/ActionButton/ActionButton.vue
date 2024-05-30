<template>
  <v-btn @click="$emit('action')" class="fab" >
    <slot name="body"></slot>
    
  </v-btn>
</template>

<script setup lang="ts">
  defineEmits(['action'])
</script>

<style scoped>
  .fab {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
</style>