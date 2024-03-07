import { VueQueryPlugin } from "@tanstack/vue-query";
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Wind from "@/presets/wind";
import { register } from "@/ui";
import App from "@/App.vue";
import "@/index.css";

const app = createApp(App);

app
	.use(VueQueryPlugin)
	.use(PrimeVue, {
		unstyled: true,
		pt: Wind,
	})
	.use(register);

app.mount("#app");
