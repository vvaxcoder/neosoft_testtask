<template>
  <main>
    <TasksList :filter="currentFilter" />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TasksList from "./components/TasksList.vue";

export default defineComponent({
  name: "App",
  components: {
    TasksList,
  },
  setup() {
    const currentFilter = ref<"all" | "active" | "completed">("all");

    const updateFilter = (filter: "all" | "active" | "completed") => {
      currentFilter.value = filter;
    };

    return { currentFilter, updateFilter };
  },
});
</script>

<style>
main {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
}
</style>
