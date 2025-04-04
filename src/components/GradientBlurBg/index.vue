<template>
	<div class="gradient-bg h-full w-full relative overflow-hidden">
		<div class="content-container absolute top-0 left-0 w-full h-full z-10">
      <slot></slot>
    </div>
		<div class="content-gradient-bg pointer-events-none absolute h-full w-full z-0 top-0 left-0">
			<div class="main-color" :style="rgbColors[0]"></div>
			<div class="g-polygon g-polygon-1" :style="rgbColors[1]"></div>
			<div class="g-polygon g-polygon-2" :style="rgbColors[2]"></div>
			<div class="g-polygon g-polygon-3" :style="rgbColors[3]"></div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { computed } from 'vue'
	import { type RGBColor } from 'colorthief'
	// https://www.zhangxinxu.com/wordpress/2015/02/image-local-blur-background-attachment-fixed/
	interface Props {
		colors?: RGBColor[]
	}

	const props = withDefaults(defineProps<Props>(), {
		colors: () => []
	})

	const rgbColors = computed(() => {
		const { colors } = props
		const mainColor = colors[0]
		if (!mainColor) return []
		const rgbColors = colors.slice(1).map((item) => {
			return `background: rgb(${item.join(',')})`
		})

		const mainColorStyle = `background: linear-gradient(180deg, transparent 10%, rgba(${mainColor.join(
			','
		)}, 1) 100%)`
		const modfiedColors = rgbColors.sort(() => Math.random() - Math.random())

		return [mainColorStyle, ...modfiedColors]
	})
</script>

<style lang="scss" scoped>
	.content-gradient-bg {
		transform: translate3d(0, 0, 0);
		filter: blur(40px);
		transform: scale(1.3);

		&:after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.4);
		}
	}

	.g-polygon {
		position: absolute;
		opacity: 0.5;
		width: 100%;
		height: 100%;
		transform: scale(1.3) translate3d(0, 0, 0);
		will-change: background;
		z-index: 0;
		transition: background 0.6s ease-in;
	}

	.main-color {
		position: absolute;
		opacity: 0.5;
		width: 100%;
		height: 100%;
		z-index: 1;
		transform: translate3d(0, 0, 0);
		will-change: background;
		transition: background 0.6s ease-in;
	}
	.g-polygon-1 {
		-webkit-clip-path: polygon(-2% -8%, 66% 30%, 99% 100%, -17% 100%, -31% 15%);
		clip-path: polygon(-2% -8%, 66% 30%, 99% 100%, -17% 100%, -31% 15%);
	}

	.g-polygon-2 {
		-webkit-clip-path: polygon(50% 0%, 118% -6%, 91% 67%, 37% 100%, -10% -1%);
		clip-path: polygon(50% 0%, 118% -6%, 91% 67%, 37% 100%, -10% -1%);
	}

	.g-polygon-3 {
		-webkit-clip-path: polygon(69% 0%, 100% 4%, 110% 113%, 38% 65%, 7% 10%);
		clip-path: polygon(69% 0%, 100% 4%, 110% 113%, 38% 65%, 7% 10%);
	}
</style>
