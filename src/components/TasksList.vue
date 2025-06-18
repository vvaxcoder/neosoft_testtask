<template>
  <div>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <input
          type="checkbox"
          :checked="task.completed"
          @change="toggle(task.id)"
        />
        <span :class="{ completed: task.completed }">{{ task.title }}</span>
        <button @click="remove(task.id)">Удалить</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { Task } from "@/types/Task";

export default defineComponent({
  name: "TasksList",
  props: {
    filter: String,
  },
  setup(props) {
    const store = useStore();

    onMounted(() => {
      store.dispatch("tasks/fetchTasks");
    });

    const allTasks = computed<Task[]>(() => store.getters["tasks/allTasks"]);

    const activeTasks = computed<Task[]>(
      () => store.getters["tasks/activeTasks"]
    );
    const completedTasks = computed<Task[]>(
      () => store.getters["tasks/completedTasks"]
    );

    const toggle = (id: number) => {
      store.dispatch("tasks/toggleTask", id);
    };

    const remove = (id: number) => {
      store.dispatch("tasks/deleteTask", id);
    };

    const tasks = computed(() => {
      switch (props.filter) {
        case "active":
          return activeTasks.value;
        case "completed":
          return completedTasks.value;
        case "all":
        default:
          return allTasks.value;
      }
    });

    return { tasks, toggle, remove };
  },
});
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  color: gray;
}

li > span {
  width: calc(100% - 100px);

  display: inline-block;
}
</style>
