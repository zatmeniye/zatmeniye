import { IType } from "./type";
import { ISlot } from "./slot";
import { IProp } from "./prop";
import { IEmit } from "./emit";
import { IAction } from "./action";

export interface IWidget {
	id: number;
	type: IType;
	props: IProp[] | null;
	slots: ISlot[] | null;
	emits: IEmit[] | null;
	initHandlers: IAction[] | null;
}
