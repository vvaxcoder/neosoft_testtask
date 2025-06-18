<template>
  <main>
    <h1>Список задач</h1>
    <TaskInput />
    <TasksList :filter="currentFilter" />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TasksList from "./components/TasksList.vue";
import TaskInput from "./components/TaskInput.vue";

export default defineComponent({
  name: "App",
  components: {
    TasksList,
    TaskInput,
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

h1 {
  text-align: center;
  margin-bottom: 1rem;
}
</style>
