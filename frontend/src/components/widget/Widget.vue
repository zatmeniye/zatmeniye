<script lang="ts" setup>
import { IContext, IProp, IWidget } from "@/types";
import { uiComponents } from "@/ui";
import { getVariable, ProcessExecutor } from "@/lib";
import { inject, ref } from "vue";

const props = defineProps<{ ctx?: IContext; widget: IWidget }>();

const processExecutor = inject<ProcessExecutor | null>("processExecutor", null);

const updatedCtx = ref<IContext>({
	namespace: {
		async executeProcess(pid: number) {
			if (processExecutor) {
				const data = await processExecutor.execute(pid);
				if (data) {
					updatedCtx.value.namespace = {
						...updatedCtx.value.namespace,
						data: data,
					};
				}
			}
		},
	},
	parent: props.ctx ?? null,
});

if (props.widget.initHandlers) {
	props.widget.initHandlers.forEach((handler) => {
		const fn = getVariable(updatedCtx.value, handler);
		if (typeof fn === "function") {
			if (fn[Symbol.toStringTag] === "AsyncFunction") {
				fn();
				return;
			}
			fn();
		}
	});
}

const getComponent = (widget: IWidget) => {
	return uiComponents[widget.type.name] ?? null;
};

const getEmits = (widget: IWidget) => {
	const result: { [key: string]: (event: any) => any } = {};

	widget.emits?.forEach((emit) => {
		result[emit.name] = (event: any) => {
			emit.handlers.forEach((handler) => {
				const fn = getVariable(updatedCtx.value, handler);
				if (typeof fn === "function") {
					fn(event);
				}
			});
		};
	});

	return result;
};

const dict: { [key: string]: { nullValue: any; handler: any } } = {
	boolean: { nullValue: false, handler: Boolean },
	number: { nullValue: 0, handler: Number },
	bigint: { nullValue: 0n, handler: BigInt },
	string: { nullValue: "", handler: String },
	array: { nullValue: [], handler: JSON.parse },
	object: { nullValue: {}, handler: JSON.parse },
};

const getProps = (widget: IWidget) => {
	const result: { [key: string]: any } = {};

	widget.props?.forEach((prop) => {
		if (prop.fromVariable) {
			result[prop.name] =
				getVariable(updatedCtx.value, prop.value) ?? dict[prop.type].nullValue;
			return;
		}
		result[prop.name] = castProp(prop);
	});

	return result;
};

const castProp = (prop: IProp) => {
	try {
		return dict[prop.type]?.handler(prop.value);
	} catch {
		return dict[prop.type].nullValue;
	}
};
</script>

<template>
	<component
		:is="getComponent(widget)"
		v-bind="getProps(widget)"
		v-on="getEmits(widget)"
	>
		<template
			v-for="slot in widget.slots"
			:key="slot.name"
			v-slot:[slot.name]="slotProps"
		>
			<template
				v-for="slotWidget in slot.widgets"
				:key="slotWidget.id"
			>
				<component
					v-if="slotWidget.type.dataTransfer"
					:is="getComponent(slotWidget)"
					v-bind="getProps(slotWidget)"
				>
					<template
						v-for="slot in slotWidget.slots"
						:key="slot.name"
						v-slot:[slot.name]="slotProps"
					>
						<Widget
							:ctx="{ namespace: { ...slotProps }, parent: updatedCtx }"
							v-for="slotWidget in slot.widgets"
							:key="slotWidget.id"
							:widget="slotWidget"
						/>
					</template>
				</component>
				<Widget
					v-else
					:ctx="{ namespace: { ...slotProps }, parent: updatedCtx }"
					:widget="slotWidget"
				/>
			</template>
		</template>
	</component>
</template>
