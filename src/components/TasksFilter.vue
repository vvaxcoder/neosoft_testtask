<template>
  <div class="filters">
    <button :class="{ active: filter === 'all' }" @click="setFilter('all')">
      Все
    </button>
    <button
      :class="{ active: filter === 'active' }"
      @click="setFilter('active')"
    >
      Активные
    </button>
    <button
      :class="{ active: filter === 'completed' }"
      @click="setFilter('completed')"
    >
      Выполненные
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "TasksFilter",
  emits: ["filter-changed"],
  setup(_, { emit }) {
    const filter = ref<"all" | "active" | "completed">("all");

    const setFilter = (value: "all" | "active" | "completed") => {
      filter.value = value;
    };

    watch(filter, (newVal) => {
      emit("filter-changed", newVal);
    });

    return { filter, setFilter };
  },
});
</script>

<style scoped>
.filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

button.active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
