<template>
  <div class="h-screen">
    <div class="ma-5 d-flex justify-end">
      <v-btn
        @click="router.push({ name: 'Account' })"
        variant="text"
        icon="mdi-account"
      ></v-btn>
    </div>
    <div class="d-flex align-center h-100">
      <v-container>
        <v-window v-model="step">
          <v-window-item value="0" class="pa-6">
            <profiles-component @create-profile="step = 1" />
          </v-window-item>
          <v-window-item value="1" class="pa-6">
            <new-profile-component @cancel="step = 0" />
          </v-window-item>
        </v-window>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ProfilesComponent from "@/views/LoginView/components/ProfilesComponent/ProfilesComponent.vue";
import NewProfileComponent from "@/views/LoginView/components/NewProfileComponent/NewProfileComponent.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const step = ref<number>(0);
</script>
