import { IWidget } from "@/types";
import { useId } from "@/lib";
import { table } from "./table";

export const tabs: IWidget = {
	id: useId(),
	type: { name: "TabView", dataTransfer: false },
	props: null,
	slots: [
		{
			name: "default",
			widgets: [
				{
					id: useId(),
					type: { name: "TabPanel", dataTransfer: true },
					props: [
						{
							name: "header",
							type: "string",
							value: "пользователи",
							fromVar: false,
							twoWay: false,
						},
					],
					slots: [{ name: "default", widgets: [table] }],
					emits: null,
					initHandlers: null,
				},
				{
					id: useId(),
					type: { name: "TabPanel", dataTransfer: true },
					props: [
						{
							name: "header",
							type: "string",
							value: "посты",
							fromVar: false,
							twoWay: false,
						},
					],
					slots: [{ name: "default", widgets: null }],
					emits: null,
					initHandlers: null,
				},
			],
		},
	],
	emits: null,
	initHandlers: null,
};
