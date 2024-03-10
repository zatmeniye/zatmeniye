<script lang="ts" setup>
import { cast, useContext, IContext } from "@/lib";
import { IEmit, IProp, IWidget } from "@/types";
import { uiComponents } from "@/ui";
import { ref } from "vue";

const props = defineProps<{ ctx: IContext; widget: IWidget }>();

const { ctx: updatedCtx, getVar, setVar, getVarSet } = useContext(props.ctx);

setVar("setVar", ({ name, value }: any) => {
	setVar(name, ref(value));
});

const getProps = (props: IProp[] | null) => {
	const result: { [key: string]: unknown } = {};

	props?.forEach((prop) => {
		if (prop.fromVar) {
			result[prop.name] = getVar(prop.value);
			if (prop.twoWay) {
				result[`onUpdate:${prop.name}`] = (event: any) => {
					getVarSet(prop.value)(event);
				};
			}
			return;
		}
		result[prop.name] = cast(prop.type, prop.value);
	});

	return result;
};

if (props.widget.initHandlers) {
	props.widget.initHandlers.forEach((handler) => {
		const callback = getVar(handler.name);
		if (callback instanceof (async () => {}).constructor) {
			(<any>callback)({
				...getProps(handler.props),
				ctx: updatedCtx,
			}).then((data: unknown) => {
				setVar("data", data);
			});
		} else if (typeof callback === "function") {
			setVar("data", callback({ ...getProps(handler.props), ctx: updatedCtx }));
		}
	});
}

const getComponent = (widget: IWidget) => {
	return uiComponents[widget.type.name] ?? null;
};

const getEmits = (emits: IEmit[] | null) => {
	const result: { [key: string]: () => void } = {};

	emits?.forEach((emit) => {
		result[emit.name] = () => {
			emit.handlers.forEach((handler) => {
				const callback = getVar(handler.name);
				if (callback instanceof (async () => {}).constructor) {
					(<any>callback)({ ...getProps(handler.props), ctx: updatedCtx }).then(
						(data: unknown) => {
							setVar("data", data);
						},
					);
				} else if (typeof callback === "function") {
					setVar(
						"data",
						callback({ ...getProps(handler.props), ctx: updatedCtx }),
					);
				}
			});
		};
	});

	return result;
};
</script>

<template>
	<component
		:is="getComponent(widget)"
		v-bind="getProps(widget.props)"
		v-on="getEmits(widget.emits)"
	>
		<template
			v-for="slot in widget.slots"
			:key="slot.name"
			v-slot:[slot.name]="slotProps"
		>
			<template
				v-for="widget in slot.widgets"
				:key="widget.id"
			>
				<component
					v-if="widget.type.dataTransfer"
					:is="getComponent(widget)"
					v-bind="getProps(widget.props)"
				>
					<template
						v-for="slot in widget.slots"
						:key="slot.name"
						v-slot:[slot.name]="slotProps"
					>
						<Widget
							v-for="widget in slot.widgets"
							:ctx="{ namespace: { ...slotProps }, parent: updatedCtx }"
							:key="widget.id"
							:widget="widget"
						/>
					</template>
				</component>
				<Widget
					v-else
					:ctx="{ namespace: { ...slotProps }, parent: updatedCtx }"
					:widget="widget"
				/>
			</template>
		</template>
	</component>
</template>
