import { IAction } from "./action";

export interface IEmit {
	name: string;
	handlers: IAction[];
}
