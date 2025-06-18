<template>
  <form @submit.prevent="addTask">
    <input v-model="title" type="text" placeholder="Новая задача" />
    <button type="submit">Добавить</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "TaskInput",
  setup() {
    const store = useStore();
    const title = ref("");

    const addTask = () => {
      if (title.value.trim()) {
        store.dispatch("tasks/createTask", title.value.trim());

        title.value = "";
      }
    };

    return { title, addTask };
  },
});
</script>

<style scoped>
form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

input {
  flex: 1;
  padding: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
}
</style>
