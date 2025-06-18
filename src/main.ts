import { createApp } from "vue";
import App from "./App.vue";

import { createStore } from "vuex";
import tasksModule from "@/store/tasks";

const store = createStore({
  modules: {
    tasks: tasksModule,
  },
});

createApp(App).use(store).mount("#app");
