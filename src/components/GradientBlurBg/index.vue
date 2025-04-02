<template>
	<div class="absolute blur-3xl h-full w-full">
		<css-doodle :key="JSON.stringify(colors)" class="h-full w-full" v-if="rgbColors.length">
			{{ cssDoddleCode }}
		</css-doodle>
	</div>
</template>

<script lang="ts" setup>
	import { computed } from 'vue'
	import { type RGBColor } from 'colorthief'

	interface Props {
		colors?: RGBColor[]
		blurAmount?: number
	}

	const props = withDefaults(defineProps<Props>(), {
		colors: () => [],
		blurAmount: 50
	})

	const rgbColors = computed(() => {
		const { colors } = props
		return colors.map((item) => {
			return `rgb(${item.join(',')})`
		})
	})
	const cssDoddleCode = computed(() => {
		return `
    :doodle {
        @grid: 1x${rgbColors.value.length} / 100%;
    }
    @place-cell: center;
    width: @rand(40%, 80%);
    height: @rand(40%, 80%);
    transition: .3s background, opacity;
    transform: translate(@rand(-200%, 200%), @rand(-60%, 60%)) scale(@rand(.8, 1.8)) skew(@rand(45deg));
    clip-path: polygon(
      @r(0, 30%) @r(0, 50%), 
      @r(30%, 60%) @r(0%, 30%), 
      @r(60%, 100%) @r(0%, 50%), 
      @r(60%, 100%) @r(50%, 100%), 
      @r(30%, 60%) @r(60%, 100%),
      @r(0, 30%) @r(60%, 100%)
    );
    background: @pick(${rgbColors.value.join(',')});
    opacity: @rand(.3, .8);
    `
	})
</script>
