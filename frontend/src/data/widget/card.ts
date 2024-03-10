import { IWidget } from "@/types";
import { useId } from "@/lib";
import { inputText } from "./inputText";

export const card: IWidget = {
	id: useId(),
	type: {
		name: "Card",
		dataTransfer: false,
	},
	props: null,
	slots: [
		{
			name: "title",
			widgets: [
				{
					id: useId(),
					type: {
						name: "Button",
						dataTransfer: false,
					},
					props: [
						{
							name: "label",
							value: "title",
							type: "string",
							fromVar: true,
							twoWay: false,
						},
					],
					slots: null,
					emits: null,
					initHandlers: null,
				},
			],
		},
		{ name: "content", widgets: [inputText] },
	],
	emits: null,
	initHandlers: [
		{
			name: "setVar",
			props: [
				{
					name: "name",
					type: "string",
					value: "title",
					fromVar: false,
					twoWay: false,
				},
				{
					name: "value",
					type: "string",
					value: "twoWay",
					fromVar: false,
					twoWay: false,
				},
			],
		},
	],
};
