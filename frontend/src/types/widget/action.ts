import { IProp } from "./prop";

export interface IAction {
	name: string;
	props: IProp[] | null;
}
