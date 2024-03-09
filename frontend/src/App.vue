<script setup lang="ts">
import { ProcessExecutor } from "@/lib";
import Widget from "@/components/widget/Widget.vue";
import { tabs, postList } from "@/data";
import { IContext } from "@/types";
import { provide } from "vue";

const ctx: IContext = {
	namespace: {
		postList,
		log: (...args: any) => {
			console.log(...args);
		},
	},
	parent: null,
};

provide("processExecutor", new ProcessExecutor());
</script>

<template>
	<div class="flex items-center justify-center min-h-screen">
		<Widget
			:ctx="ctx"
			:widget="tabs"
		/>
	</div>
</template>
