<script setup lang="ts">
import Widget from "@/components/widget/Widget.vue";
import { userTable } from "@/data";
</script>

<template>
	<div class="flex items-center justify-center h-screen">
		<Widget :widget="userTable" />
	</div>
</template>
