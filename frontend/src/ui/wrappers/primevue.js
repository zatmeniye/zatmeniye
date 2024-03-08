import { default as TabViewInstance } from "primevue/tabview";

export const TabView = {
	...TabViewInstance,
	computed: {
		...TabViewInstance.computed,
		tabs() {
			return this.$slots.default().reduce((tabs, child) => {
				const queue = [child];

				for (const item of queue) {
					if (this.isTabPanel(item)) {
						tabs.push(item);
					} else if (item.children && item.children instanceof Array) {
						queue.push(...item.children);
					}
				}

				return tabs;
			}, []);
		},
	},
};
