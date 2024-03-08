<script setup lang="ts">
import Widget from "@/components/widget/Widget.vue";
import { userTable, userList } from "@/data";
import { IContext } from "@/types";

const ctx: IContext = {
	namespace: { userList },
	parent: null,
};
</script>

<template>
	<div class="flex items-center justify-center h-screen">
		<Widget
			:ctx="ctx"
			:widget="userTable"
		/>
	</div>
</template>
