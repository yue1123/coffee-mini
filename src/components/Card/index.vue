<template>
	<div class="apple-card relative overflow-hidden rounded-3xl">
		<img :src="props.background" alt="" class="h-full absolute object-cover z-0 top-0 left-0" />
		<div class="card-content w-full h-full relative z-10">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
	interface Props {
		background: string
	}

	const props = defineProps<Props>()
</script>

<style lang="scss">
	.apple-card {
		&::before,
		&::after {
			position: absolute;
			bottom: 0;
			left: 0;
			content: '';
		}
		&::after {
			z-index: 2;
			width: 100%;
			height: 50%;
			background: hsla(0, 0%, 100%, 0.35);
			backdrop-filter: blur(25px);
			mask: linear-gradient(
				to bottom,
				rgba(0, 0, 0, 0) 0%,
				rgba(0, 0, 0, 0.2) 10%,
				rgba(0, 0, 0, 0.8) 30%,
				rgba(0, 0, 0, 1) 50%
			);
		}
		&::before {
			width: 100%;
			height: 15%;
			background: #000;
			z-index: 1;
			backdrop-filter: blur(15px);
			mask: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 1));
		}
	}
</style>
