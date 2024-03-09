import {
	createEmit,
	createProp,
	createSlot,
	createType,
	createWidget,
} from "@/lib";

export const userTable = createWidget(
	createType("DataTable"),
	[createProp("value", "array", "data", true)],
	[
		createSlot("default", [
			createWidget(createType("Column", true), [
				createProp("field", "string", "name"),
				createProp("header", "string", "имя"),
			]),
			createWidget(createType("Column", true), [
				createProp("field", "string", "address.city"),
				createProp("header", "string", "город"),
			]),
			createWidget(
				createType("Column", true),
				[createProp("header", "string", "действия")],
				[
					createSlot("body", [
						createWidget(
							createType("Button"),
							[
								createProp("label", "string", "удалить"),
								createProp("severity", "string", "danger"),
							],
							null,
							[createEmit("click", ["executeProcess"])],
						),
					]),
				],
			),
		]),
	],
	null,
	["executeProcess"],
);
