import { IContext, IEmit, IProp, ISlot, IType, IWidget } from "@/types";
import { isRef } from "vue";

export const createWidget = (
	type: IType,
	props: IProp[] | null = null,
	slots: ISlot[] | null = null,
	emits: IEmit[] | null = null,
): IWidget => ({
	id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
	type,
	props,
	slots,
	emits,
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
	fromVariable: boolean = false,
): IProp => ({
	name,
	type,
	value,
	fromVariable,
});

export const createSlot = (name: string, widgets: IWidget[]): ISlot => ({
	name,
	widgets,
});

export const createEmit = (name: string, handlers: string[]): IEmit => ({
	name,
	handlers,
});

export const getVariable = (ctx: IContext, name: string): any => {
	if (name in ctx.namespace) {
		return isRef(ctx.namespace[name])
			? ctx.namespace[name].value
			: ctx.namespace[name];
	}

	if (ctx.parent === null) {
		return null;
	}

	return getVariable(ctx.parent, name);
};
