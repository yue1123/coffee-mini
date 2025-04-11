<template>
	<div class="w-full py-[20px] overflow-hidden h-[400px] relative my-auto">
		<div class="w-[3000px] ani aspect-square m-auto absolute left-1/2 -translate-x-1/2">
			<div
				v-for="i in count"
				class="absolute h-[100%] left-1/2 top-0 ml-[-50px]"
				:style="{
					transform: `rotate(${i * edgBase - 15}deg)`
				}"
			>
				<div class="h-[280px] bg-[#f90] rounded-2xl" :style="{ width: `${width}px` }">
					<!-- <div class="h-full w-full bg-amber-50 rotate-3"></div> -->
				</div>
				<!-- <Card
					:blurAmount="15"
					:background="bgs[i % bgs.length]"
					:style="{ width: `${width}px` }"
					class="h-[180px] rounded-2xl"
				>
					<div class="w-full absolute top-4 left-4 text-white"></div>
				</Card> -->
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	// import { image3, bgs } from '../images'
	// import Card from '@/components/Card/index.vue'
	const width = window.innerWidth / 2
	const count = 36
	const edgBase = 360 / count
</script>

<style scoped>
	.ani {
		/* will-change: transform;
		animation-duration: 50s;
		animation-direction: reverse;
		animation-name: spin;
		animation-timing-function: linear;
		animation-iteration-count: infinite; */
	}
	@keyframes spin {
		0% {
			transform: translate3d(0, 0, 0) rotate(0);
		}
		100% {
			transform: translate3d(0, 0, 0) rotate(360deg);
		}
	}
</style>
