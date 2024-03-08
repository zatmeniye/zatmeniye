<script setup lang="ts">
import Widget from "@/components/widget/Widget.vue";
import { tabs, userList, postList } from "@/data";
import { IContext } from "@/types";

const ctx: IContext = {
	namespace: { userList, postList },
	parent: null,
};
</script>

<template>
	<div class="flex items-center justify-center min-h-screen">
		<Widget
			:ctx="ctx"
			:widget="tabs"
		/>
	</div>
</template>
