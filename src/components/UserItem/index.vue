<template>
	<div
		class="user-card w-full py-2 px-4 space-x-2 flex justify-start items-center bg-[rgba(195,195,195,10%)] backdrop-blur-3xl rounded-xl"
	>
		<img class="avatar w-8 h-8 rounded-full" src="@/assets/avatar/1.png" alt="" />
		<div class="user-content flex-1 flex justify-between items-center">
			<div class="user-info flex flex-col">
				<h2 class="font-thin text-md">shark</h2>
				<p class="text-xs opacity-50">coollll !!!!</p>
			</div>
			<div class="user-actions">
				<button class="text-white px-4 py-2 rounded">
					<Icon icon="material-symbols:more-horiz"></Icon>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Icon } from '@iconify/vue'
</script>

<style scoped></style>
