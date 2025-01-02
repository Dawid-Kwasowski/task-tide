<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { IRotationForm } from "@/views/HomeView/components/DutiesComponent/components/model/IRotationForm";
import { useTaskStore } from "@/stores/TaskStore/TasksStore";
import { storeToRefs } from "pinia";
import { reactive, ref, watch } from "vue";

const props = defineProps<IRotationForm>();
const emit = defineEmits(["change", "close"]);

const { t } = useI18n();

const store = useTaskStore();

const { duties } = storeToRefs(store);

const localAssignedDuties = reactive(props.assignedDuties);
const copyOfDuties = JSON.parse(JSON.stringify(localAssignedDuties));
const dutiesToChange = ref<Array<any>>([]);

watch(
  localAssignedDuties,
  (newVal) => {
    dutiesToChange.value = newVal.filter(
      (item, index) =>
        JSON.stringify(item) !== JSON.stringify(copyOfDuties[index]),
    );
    console.log(dutiesToChange.value);
  },
  { deep: true },
);

const changeDuties = function () {
  emit("change", dutiesToChange.value);
};
</script>

<template>
  <form @submit.prevent="changeDuties">
    <v-container>
      <v-row :key="item.id" v-for="item in localAssignedDuties">
        <v-col>
          <v-text-field
            v-model="item.username"
            :readonly="true"
            :label="t('home.duty.dialog.fields.user')"
            variant="solo-filled"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-select
            v-model="item.duties"
            return-object
            chips
            multiple
            :label="t('home.duty.dialog.fields.duty')"
            variant="solo-filled"
            :items="duties"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn block type="submit">
            {{ t("home.duty.dialog.actions.change") }}
          </v-btn>
        </v-col>
        <v-col>
          <v-btn @click="emit('close')" variant="text" block>
            {{ t("home.duty.dialog.actions.cancel") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </form>
</template>
