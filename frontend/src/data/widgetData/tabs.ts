import { createProp, createSlot, createType, createWidget } from "@/lib";
// noinspection ES6PreferShortImport
import { userTable } from "./userTable";
import { postTable } from "./postTable";

export const tabs = createWidget(createType("TabView"), null, [
	createSlot("default", [
		createWidget(
			createType("TabPanel", true),
			[createProp("header", "string", "пользователи")],
			[createSlot("default", [userTable])],
		),
		createWidget(
			createType("TabPanel", true),
			[createProp("header", "string", "посты")],
			[createSlot("default", [postTable])],
		),
	]),
]);
