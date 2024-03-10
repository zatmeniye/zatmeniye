import { App } from "vue";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tree from "primevue/tree";
import Card from "primevue/card";
import Panel from "primevue/panel";
import TabPanel from "primevue/tabpanel";
import Checkbox from "primevue/checkbox";
import Dropdown from "primevue/dropdown";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import { TabView } from "./wrappers/primevue";
import Form from "./components/form/Form.vue";

export const uiComponents: { [key: string]: any } = {
	Button,
	DataTable,
	Column,
	Tree,
	Card,
	Panel,
	TabView,
	TabPanel,
	Checkbox,
	Dropdown,
	InputNumber,
	InputText,
	Dialog,
	Form,
};

export const register = {
	install: (app: App<Element>) => {
		Object.keys(uiComponents).forEach((key) => {
			app.component(key, (<any>uiComponents)[key]);
		});
	},
};
