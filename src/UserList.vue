<template>
	<DrawerRoot>
		<DrawerTrigger>
			<button
				class="border-none focus:outline-none flex justify-center items-center space-x-1 blur-button p-1 backdrop-blur-xl bg-[rgba(0,0,0,0.2)] rounded-full"
			>
				<Icon class="text-2xl scale-y-80" icon="material-symbols:add-rounded" />
			</button>
		</DrawerTrigger>
		<DrawerPortal>
			<DrawerOverlay class="fixed z-50 inset-0 bg-black/30" />
			<DrawerContent
				class="focus:outline-none overflow-y-auto p-4 z-60 bg-[rgba(73,73,73,0.8)] shadow-2xl backdrop-blur-3xl text-white flex flex-col rounded-t-2xl h-full mt-24 max-h-[80%] fixed bottom-0 left-0 right-0"
			>
				<DrawerHandle data-testid="handle" class="mb-8 mt-2" />
				<div>
					<h2 class="font-thin mb-4">Admin</h2>
					<div class="user-list space-y-4">
						<UserItem v-for="i in 2" :key="i"></UserItem>
					</div>
				</div>
				<div class="mt-4">
					<h2 class="font-thin mb-4">User</h2>
					<div class="user-list space-y-4">
						<UserItem v-for="i in 3" :key="i"></UserItem>
					</div>
				</div>
			</DrawerContent>
		</DrawerPortal>
	</DrawerRoot>
</template>

<script setup lang="ts">
	import { Icon } from '@iconify/vue'
	import { DrawerContent, DrawerOverlay, DrawerHandle, DrawerPortal, DrawerRoot, DrawerTrigger } from 'vaul-vue'
	import UserItem from './UserItem.vue'
</script>
