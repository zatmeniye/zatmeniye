import _ from "lodash";
import { isRef, ref, Ref } from "vue";

export interface IContext {
	parent: IContext | null;
	namespace: { [key: string]: unknown };
}

export function useContext(
	parent: IContext | null = null,
	namespace: { [key: string]: unknown } | null = null,
): {
	ctx: Ref<IContext>;
	getVar: (name: string) => unknown;
	setVar: (name: string, value: unknown) => void;
	getVarSet: (name: string) => any;
} {
	const ctx = ref<IContext>({
		parent,
		namespace: namespace ? _.cloneDeep(namespace) : {},
	});

	return {
		ctx,
		getVar(name: string): unknown {
			let current: IContext | null = ctx.value;

			while (current !== null) {
				if (name in current.namespace) {
					return current.namespace[name];
				}
				current = current.parent;
			}

			return null;
		},
		getVarSet(name: string) {
			let current: IContext | null = ctx.value;

			while (current !== null) {
				if (name in current.namespace) {
					return (value: unknown) => {
						(<any>current).namespace[name] = value;
					};
				}
				current = current.parent;
			}

			return null;
		},
		setVar(name: string, value: unknown) {
			if (name in ctx.value.namespace && isRef(ctx.value.namespace[name])) {
				(<any>ctx.value.namespace[name]).value = value;
				return;
			}
			ctx.value.namespace[name] = value;
		},
	};
}
