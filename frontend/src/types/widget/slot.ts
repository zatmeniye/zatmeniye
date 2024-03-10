import { IWidget } from "./widget";

export interface ISlot {
	name: string;
	widgets: IWidget[] | null;
}
