import { IWidget } from "@/types";
import { useId } from "@/lib";

export const inputText: IWidget = {
	id: useId(),
	type: {
		name: "InputText",
		dataTransfer: false,
	},
	props: [
		{
			name: "modelValue",
			type: "string",
			value: "title",
			fromVar: true,
			twoWay: true,
		},
		{
			name: "placeholder",
			type: "string",
			value: "заголовок",
			fromVar: false,
			twoWay: false,
		},
	],
	slots: null,
	emits: null,
	initHandlers: null,
};
