import { createProp, createSlot, createType, createWidget } from "@/lib";

export const postTable = createWidget(
	createType("DataTable"),
	[createProp("value", "array", "postList", true)],
	[
		createSlot("default", [
			createWidget(createType("Column", true), [
				createProp("field", "string", "title"),
				createProp("header", "string", "заголовок"),
			]),
			createWidget(
				createType("Column", true),
				[createProp("header", "string", "действия")],
				[
					createSlot("body", [
						createWidget(createType("Button"), [
							createProp("label", "string", "удалить"),
							createProp("severity", "string", "danger"),
						]),
					]),
				],
			),
		]),
	],
);
