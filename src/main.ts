import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import "./style.css";
import { VueQueryPlugin } from "@tanstack/vue-query";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);

app.mount("#app");
