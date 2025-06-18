import { Module } from "vuex";
import { Task } from "@/types/Task";
import { getTasks, addTask, deleteTask, toggleTaskStatus } from "@/api/tasks";

export interface TasksState {
  tasks: Task[];
}

const tasksModule: Module<TasksState, unknown> = {
  namespaced: true,
  state: () => ({
    tasks: [],
  }),
  getters: {
    allTasks: (state) => state.tasks,
    activeTasks: (state) => state.tasks.filter((t) => !t.completed),
    completedTasks: (state) => state.tasks.filter((t) => t.completed),
  },
  mutations: {
    SET_TASKS(state, tasks: Task[]) {
      state.tasks = tasks;
    },
    ADD_TASK(state, task: Task) {
      state.tasks.push(task);
    },
    REMOVE_TASK(state, taskId: number) {
      state.tasks = state.tasks.filter((t) => t.id !== taskId);
    },
    TOGGLE_TASK(state, updatedTask: Task) {
      const index = state.tasks.findIndex((t) => t.id === updatedTask.id);
      if (index !== -1) state.tasks[index] = updatedTask;
    },
  },
  actions: {
    async fetchTasks({ commit }) {
      const tasks = await getTasks();
      commit("SET_TASKS", tasks);
    },
    async createTask({ commit }, title: string) {
      const task = await addTask(title);
      commit("ADD_TASK", task);
    },
    async deleteTask({ commit }, id: number) {
      await deleteTask(id);
      commit("REMOVE_TASK", id);
    },
    async toggleTask({ commit }, id: number) {
      const updated = await toggleTaskStatus(id);
      commit("TOGGLE_TASK", updated);
    },
  },
};

export default tasksModule;
