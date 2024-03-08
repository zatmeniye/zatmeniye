import { IProp, ISlot, IType, IWidget } from "@/types";

export const createWidget = (
	type: IType,
	props: IProp[] | null = null,
	slots: ISlot[] | null = null,
): IWidget => ({
	id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
	type,
	props,
	slots,
});

export const createType = (
	name: string,
	dataTransfer: boolean = false,
): IType => ({
	name,
	dataTransfer,
});

export const createProp = (
	name: string,
	type: string,
	value: string,
): IProp => ({
	name,
	type,
	value,
});

export const createSlot = (name: string, widgets: IWidget[]): ISlot => ({
	name,
	widgets,
});
