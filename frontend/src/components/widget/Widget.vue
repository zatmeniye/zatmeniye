<script lang="ts" setup>
import { IProp, IWidget } from "@/types";
import { uiComponents } from "@/ui";

defineProps<{ widget: IWidget }>();

const getComponent = (widget: IWidget) => {
	return uiComponents[widget.type.name] ?? null;
};

const getProps = (widget: IWidget) => {
	const props: { [key: string]: any } = {};

	widget.props?.forEach((prop) => (props[prop.name] = castProp(prop)));

	return props;
};

const castProp = (prop: IProp) => {
	const dict: { [key: string]: { nullValue: any; handler: any } } = {
		boolean: { nullValue: false, handler: Boolean },
		number: { nullValue: 0, handler: Number },
		bigint: { nullValue: 0n, handler: BigInt },
		string: { nullValue: "", handler: String },
		array: { nullValue: [], handler: JSON.parse },
		object: { nullValue: {}, handler: JSON.parse },
	};

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
	>
		<template
			v-for="slot in widget.slots"
			:key="slot.name"
			v-slot:[slot.name]
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
						v-slot:[slot.name]
					>
						<Widget
							v-for="slotWidget in slot.widgets"
							:key="slotWidget.id"
							:widget="slotWidget"
						/>
					</template>
				</component>
				<Widget
					v-else
					:widget="slotWidget"
				/>
			</template>
		</template>
	</component>
</template>
