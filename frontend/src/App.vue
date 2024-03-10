<script lang="ts" setup>
import { useContext, useProcessor } from "@/lib";
import { card } from "@/data";
import Widget from "@/components/widget/Widget.vue";

const processor = useProcessor();

const { ctx } = useContext(null, {
	execute: async ({ pid }: any) => {
		return await processor.execute(pid);
	},
	invalidate: ({ pid }: any) => {
		processor.invalidate(pid);
	},
});
</script>

<template>
	<div class="min-h-screen grid grid-cols-2 gap-6 p-6 items-start">
		<Widget
			:ctx="ctx"
			:widget="card"
		/>
	</div>
</template>
