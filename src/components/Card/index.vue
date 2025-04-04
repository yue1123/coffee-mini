<template>
	<div class="apple-card relative overflow-hidden rounded-3xl">
		<div class="card-content w-full h-full relative z-10">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue'

	interface Props {
		background: string
	}

	const props = defineProps<Props>()
	const background = computed(() => {
		return `url(${props.background})`
	})
</script>

<style lang="scss">
	.apple-card {
		background: v-bind(background) no-repeat center bottom / cover;

		&::before,
		&::after {
			position: absolute;
			bottom: 0;
			left: 0;
			content: '';
			filter: blur(25px);
			transform: scale(1.3) translate3d(0, 0, 0);
		}
		&::after {
			z-index: 2;
			width: 100%;
			height: 40%;
			background: inherit;
		}
		&::before {
			width: 100%;
			height: 20%;
			background: #000;
			z-index: 1;
		}
	}
</style>
