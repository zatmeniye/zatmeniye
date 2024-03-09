import { IContext, IEmit, IProp, ISlot, IType, IWidget } from "@/types";
import { isRef } from "vue";
export { ProcessExecutor } from "./processExecutor";

export function createWidget(
	type: IType,
	props: IProp[] | null = null,
	slots: ISlot[] | null = null,
	emits: IEmit[] | null = null,
	initHandlers: string[] | null = null,
): IWidget {
	return {
		id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
		type,
		props,
		slots,
		emits,
		initHandlers,
	};
}

export function createType(name: string, dataTransfer: boolean = false): IType {
	return {
		name,
		dataTransfer,
	};
}

export function createProp(
	name: string,
	type: string,
	value: string,
	fromVariable: boolean = false,
): IProp {
	return {
		name,
		type,
		value,
		fromVariable,
	};
}

export function createSlot(name: string, widgets: IWidget[]): ISlot {
	return {
		name,
		widgets,
	};
}

export function createEmit(name: string, handlers: string[]): IEmit {
	return {
		name,
		handlers,
	};
}

export function getVariable(ctx: IContext, name: string): any {
	if (name in ctx.namespace) {
		return isRef(ctx.namespace[name])
			? ctx.namespace[name].value
			: ctx.namespace[name];
	}

	if (ctx.parent === null) {
		return null;
	}

	return getVariable(ctx.parent, name);
}
